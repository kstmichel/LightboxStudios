import { NextApiRequest, NextApiResponse } from "next";
import { createProject } from "app/lib/actions"; 
import { PortfolioCategoryKeys, ProjectTable} from "app/lib/definitions";
import formidable from 'formidable';
import { validateFieldsForServer } from "app/lib/validation";

export const config = {
  api: {
    bodyParser: false,
  },
};
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {

    if (req.method === 'POST') {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to parse form data' });
            }
        
            try {

                const validationResponse = await validateFieldsForServer(fields);

                if (!validationResponse.success){
                    return res.status(400).json({ errors: validationResponse.error });
                }

                const { data } = validationResponse;

                const response = await createProject({
                    ...data,
                    type: data?.type as PortfolioCategoryKeys
                    } as ProjectTable);

                res.status(200).json(response);

            } catch (error) {
                console.error("Failed to update project:", error);
                res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
            }
            });
    
     }  else {
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }