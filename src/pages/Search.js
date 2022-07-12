import Shell from "../components/Shell";
import { Card, Button, NativeSelect } from "@mantine/core";

const Search = () => {
  return (
    <Shell>
      <div className="feed">
        <div className="search-container">
          <Card>
            <form className="search-form">
              <div className="search-filters">
                <NativeSelect
                  data={["Beatmaker", "Compositor"]}
                  placeholder="Rol"
                  label="Rol"
                  required
                />
                <NativeSelect
                  placeholder="Ubicación"
                  label="Ubicado en"
                  searchable
                  required
                  nothingFound="No pudimos encontrar tu ubicación"
                  data={["Medellín", "Cali", "Bogotá", "Ibagué"]}
                />
              </div>
              <Button>Buscar</Button>
            </form>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Search;
