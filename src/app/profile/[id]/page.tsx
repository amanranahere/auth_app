export default function UserProfile({ params }: any) {
  return (
    <div className="h-screen w-full flex justify-center items-center text-2xl">
      Welcome&nbsp; <span className="text-[#00bfff]">{params.id}</span>
    </div>
  );
}
