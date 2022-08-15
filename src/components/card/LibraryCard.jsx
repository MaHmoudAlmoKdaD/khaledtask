import {
  Chip,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";

import { uniqueId } from "lodash";

const useStyles = makeStyles((theme) => ({
  chip: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const LibraryCard = ({ title, description, sectors, categories }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          alt="Contemplative Reptile"
          image="https://cdn-icons-png.flaticon.com/512/4252/4252296.png"
          title="Contemplative Reptile"
          style={{ paddingTop: "50%" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography paragraph style={{ marginBottom: 0, marginTop: 10 }}>
            Sectors
          </Typography>
          <Box className={classes.chip}>
            {sectors.map((s) => (
              <Chip key={uniqueId()} label={s} />
            ))}
          </Box>
          <Typography paragraph style={{ marginBottom: 0, marginTop: 10 }}>
            Categories
          </Typography>
          <Box className={classes.chip}>
            {categories.map((s) => (
              <Chip key={uniqueId()} label={s} />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary">
          Preview
        </Button>
        <Button variant="contained" color="primary">
          Download
        </Button>
      </CardActions>
    </Card>
  );
};

export default LibraryCard;
