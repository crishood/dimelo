import Shell from "../components/Shell";
import { Card, Button, NativeSelect, TextInput, Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useForm } from "@mantine/form";
import { searchUsers } from "../api";
import { useState } from "react";
import { setLoading } from "../slices/uiSlice";
import ArtistFound from "../components/ArtistFound";

const Search = () => {
  const [results, setResults] = useState([]);

  const form = useForm({
    initialValues: {
      role: "",
      location: "",
    },
  });

  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(setLoading(true));
    const { role, location } = form.values;
    const response = await searchUsers(role, location);
    setResults(response);
    dispatch(setLoading(false));
  };
  console.log(results);
  return (
    <Shell>
      <div className="feed">
        <div className="search-container">
          <Card>
            <form
              className="search-form"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <div className="search-filters">
                <NativeSelect
                  data={["Beatmaker", "Compositor"]}
                  placeholder="Rol"
                  label="Rol"
                  required
                  {...form.getInputProps("role")}
                />
                <TextInput
                  placeholder="Ubicación"
                  label="Ubicado en"
                  required
                  {...form.getInputProps("location")}
                />
              </div>
              <Button type="submit">Buscar</Button>
            </form>
          </Card>
        </div>
        {loading ? (
          <Loader />
        ) : (
          results.map((item) => {
            return (
              <ArtistFound
                name={item.artistName}
                picture={item.picture}
                role={item.role}
                location={item.location}
              />
            );
          })
        )}
      </div>
    </Shell>
  );
};

export default Search;
