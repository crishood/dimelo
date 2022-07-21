import Shell from "../components/Shell";
import { Card, Button, NativeSelect, TextInput, Loader } from "@mantine/core";
import { useDispatch, useSelector, shallowEqual } from "react-redux/es/exports";
import { fetchUsers } from "../slices/usersSlice";
import { setLoading } from "../slices/uiSlice";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import ArtistFound from "../components/ArtistFound";

const Search = () => {
  const users = useSelector((state) => state.users.users, shallowEqual);
  const loading = useSelector((state) => state.ui.loading);
  const form = useForm({
    initialValues: {
      role: "",
      location: "",
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  const handleSubmit = async () => {
    const { role, location } = form.values;
    dispatch(fetchUsers({ role, location }));
  };

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
        {users.length === 0 ? (
          <p>Busca artistas en tu ciudad...</p>
        ) : loading ? (
          <Loader />
        ) : (
          users.map((item) => {
            return (
              <ArtistFound
                key={item._id}
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
