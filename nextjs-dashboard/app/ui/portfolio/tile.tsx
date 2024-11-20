
import React, {useRef} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
  } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Project } from "app/lib/definitions";

enum ProjectAction {
  None,
  View,
  Edit,
  Create,
  Delete,
}

interface TileProps {
    project?: Project,
    onAction: (action: ProjectAction, project: Project) => void;
}
  
const Tile: React.FC<TileProps> = ({ project, onAction }) => {   
    if (!project) return <Card>Project not found</Card>;
    
    const cardRef = useRef(null);

    const actions = [
      { 
        icon: <Edit />, 
        name: 'Edit',
        onClick: () => onAction(ProjectAction.Edit, project) 
      },
      { 
        icon: <Delete />, 
        name: 'Delete',
        onClick: () => onAction(ProjectAction.Delete, project) 
      },
    ]
  
    return (
      <Card 
        ref={cardRef}
        key={project.id} 
      >
        <CardActionArea onClick={() => onAction(ProjectAction.View, project)}>
          <CardMedia
            sx={{ height: 140 }}
            image={project.image_url}
            title={project.alt}
            style={{ position: "relative" }}
          />
  
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {project.title}
            </Typography>
            
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {project.description}
            </Typography>
          </CardContent>
        </CardActionArea>
  
        <CardActions className="flex justify-between w-full relative">
          <Button size="small" onClick={() => onAction(ProjectAction.View, project)}>Learn More</Button>
          <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 6, fontSize: '10px', right: 4 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={`${project.id}_action_${action.name}`}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  className="hover:text-active hover:bg-active-lightest"
                  onClick={action.onClick}
                />
              ))}
         </SpeedDial>
        </CardActions>
      </Card>
    );
  }
  
export default React.memo(Tile);
  