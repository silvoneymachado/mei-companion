import { ExpandMore, ExpandLess, Edit, Delete } from "@mui/icons-material";
import {
  Card,
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  CardActions,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  primaryText: string;
  secondaryText: string;
  description?: string;
  hideActions?: boolean;
  hideDeleteAction?: boolean;
  hideEditAction?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  id?: number;
}

const CustomListItem: React.FC<Props> = (props: Props) => {
  const {
    primaryText,
    secondaryText,
    description,
    hideActions,
    hideDeleteAction,
    hideEditAction,
    onDelete,
    onEdit,
    id,
  } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <ListItem
        alignItems="flex-start"
        button
        onClick={() => (hideActions ? {} : handleExpandClick())}
      >
        <ListItemText
          primary={primaryText}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {secondaryText}
              </Typography>
              {description ? ` - ${description}` : null}
            </>
          }
        />
      </ListItem>
      {(!hideActions) && (
        <>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 0,
              marginTop: -5,
            }}
            disableSpacing
          >
            <IconButton aria-label="actions" onClick={handleExpandClick}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </CardActions>
          <Collapse
            sx={{ alignSelf: "flex-end" }}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <Divider variant="fullWidth" />
            <CardActions
              sx={{ display: "flex", justifyContent: "flex-end" }}
              disableSpacing
            >
              {!hideEditAction && (<Button startIcon={<Edit />} onClick={() => onEdit(id)}>
                Editar
              </Button>)}
              {!hideDeleteAction && (<Button
                color="error"
                startIcon={<Delete />}
                onClick={() => onDelete(id)}
              >
                Excluir
              </Button>)}
            </CardActions>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default CustomListItem;
