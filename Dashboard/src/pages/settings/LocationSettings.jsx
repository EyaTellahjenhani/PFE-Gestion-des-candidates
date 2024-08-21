import React, { useState } from "react";
import { Button, Spinner, Table } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../constant/constant";
import useFetch from "../../Hooks/useFetch";

const LocationSettings = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const { data, isLoading, setData } = useFetch(() =>
    axios.get(API_BASE_URL + "/admin/location/", { withCredentials: true })
  );

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await axios
        .post(
          API_BASE_URL + "/admin/location/",
          { title },
          { withCredentials: true }
        )
        .then((response) => {
          setLoading(false);
          toast.success(response.data.message);
          const newLocation = response.data.location;
          setData((prevData) => [...prevData, newLocation]);
          setTitle("");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      await axios.delete(`${API_BASE_URL}/admin/location/${id}`, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success("Location deleted successfully");

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <form className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Localisation
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
            style={{ backgroundColor: "#1a56db" }}
          >
            {loading ? "En cours..." : "Ajouter"}
          </Button>
        </div>
      </form>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Spinner size="md" />
        </div>
      )}
      <Table hoverable className="mt-4">
        <Table.Head>
          <Table.HeadCell>Localisation</Table.HeadCell>
          <Table.HeadCell className="flex justify-end ">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell className="flex justify-end">
                <Button
                  size="xs"
                  style={{ backgroundColor: "#be1721", marginLeft: "10px" }}
                  onClick={() => handleDelete(item._id)}
                >
                  Supprimer
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default LocationSettings;
