import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
// import { data } from "./Data";
import { flattenDeep, uniq } from "lodash";
import LibraryCard from "./components/card/LibraryCard";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
function App() {
  const ref = collection(db, "library");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    sectors: [],
  });

  useEffect(() => {
    getLibraryDocs();
  }, []);

  useEffect(() => {
    if (
      searchQuery ||
      filters.administration ||
      filters.sectors.length > 0 ||
      filters.categories.length > 0
    ) {
      setFilteredDocs(
        data.filter((d) => {
          let verdict = true;
          if (searchQuery) {
            verdict =
              verdict &&
              JSON.stringify(d)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
          }

          if (filters.sectors.length > 0) {
            verdict =
              verdict &&
              filters.sectors.some((elem) => d.sectors.includes(elem));
          }
          if (filters.categories.length > 0) {
            verdict =
              verdict &&
              filters.categories.some((elem) => d.category.includes(elem));
          }
          return verdict;
        })
      );
    } else {
      setFilteredDocs(data);
    }
  }, [searchQuery, filters]);

  const getLibraryDocs = async () => {
    const data = await getDocs(ref);
    let temp = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setFilteredDocs(temp);
    setData(temp);
  };
  return (
    <Container maxWidth="xl">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Legal Library
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <TextField
                    variant="outlined"
                    id="standard-basic"
                    label="Search By Title"
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    multiple
                    options={uniq(flattenDeep(data.map((i) => i.sectors)))}
                    onChange={(_, value) =>
                      setFilters({ ...filters, sectors: value })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Search By Sectors"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    multiple
                    options={uniq(flattenDeep(data.map((i) => i.category)))}
                    onChange={(_, value) =>
                      setFilters({ ...filters, categories: value })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Search By Category"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {filteredDocs.slice(0, index * 12).map((i, index) => (
              <Grid item xs={12} md={3} sm={6}>
                <LibraryCard
                  key={`library-${index + 1}`}
                  title={i.title}
                  description={i.description}
                  sectors={i.sectors}
                  categories={i.category}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {data.length > index * 12 && (
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Box mt={8} mx={"auto"}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIndex(index + 1)}
                  >
                    Load More
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
