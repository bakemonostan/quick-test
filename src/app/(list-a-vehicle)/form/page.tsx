'use client'
import FormContainer from "../list-a-vehicle/components/list-a-vehicle-forms/FormContainer";
export default function ListAVehicleFormPage() {
  // const { postal_code } = useVehicleListingStore();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!postal_code || postal_code.trim() === "") {
  //     router.push("/list-a-vehicle");
  //   }
  // }, []);
  return (
    <section className="pt-5">
      <div className="mx-auto max-w-[45.9375rem] border p-4 bg-white rounded-md border-none">
        <FormContainer />
      </div>
    </section>
  );
}
