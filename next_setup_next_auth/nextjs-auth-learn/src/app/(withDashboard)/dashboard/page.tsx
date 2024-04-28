import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async() => {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  return (
    <>
      {
        session?.user && <div>
        <h1 className="text-4xl text-center mt-10">Welcome  {session?.user?.name}</h1>
        <h1 className="text-4xl text-center mt-10">Loged-in User&apos;s Email:  {session?.user?.email}</h1>
        <Image 
          className="mx-auto rounded-full" 
          src={session?.user?.image || ''} 
          width={200} 
          height={200} 
          alt="" 
        />
      </div>
      }
    </>
  );
};

export default DashboardPage;
