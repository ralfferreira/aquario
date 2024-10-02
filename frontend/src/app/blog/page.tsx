import ProfileCard from "@/components/Shared/ProfileCard";

export default function Blog() {
  const testeUser = {
    name: "TRIL",
    image: "/Image Card.png",
    type: "laboratorio",
    url: "https://www.google.com"
  }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProfileCard profileUser = {testeUser} type="voluntario" date="20/12/2024" url="https://www.youtube.com"></ProfileCard>
      </main>
    );
  }

// export default function Blog() {
//     return (
//       <main className="flex min-h-screen flex-col items-center justify-between p-24">
//         <p>Blog Page</p>
//       </main>
//     );
//   }
  