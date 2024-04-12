import Navbar from "../components/Navbar";

export default function NoPage() {
  return (
    <>
      <Navbar />
      <h2
        style={{
          marginTop: 100,
        }}
      >
        Error: 404
      </h2>
    </>
  );
}
