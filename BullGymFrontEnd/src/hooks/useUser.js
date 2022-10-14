import { useEffect, useState } from "react";
import { getUserDataService } from "../services";

const useUser = (id) => {
  //Sergio tiene cambiado el userState, en vez de un array lo tiene como un objeto
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await getUserDataService(id);

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return { user, error, loading };
};

export default useUser;
