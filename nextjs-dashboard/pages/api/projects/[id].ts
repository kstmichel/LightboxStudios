import { NextApiRequest, NextApiResponse } from "next";
import { deleteProject, updateProject, ProjectState } from "app/lib/actions"; 
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
  const { id } = req.query;

  // Validate category
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid project id" });
  }

  if (req.method === 'DELETE') {
    try {
        const response: ProjectState = await deleteProject(id);

        res.status(200).json({ 
            success: true, 
            errors: [],
            message: response.message,
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(404).json({ message: 'Unknown error' });
        }
    }
   }  
   else if (req.method === 'PUT') {
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
        
        if (!data) {
          return res.status(400).json({ message: 'No field data to update' });
        }

        const response = await updateProject(id, {
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
