export default function PriceDisplay({ price }) {
  return (
    <div className="text-center mt-4 text-3xl font-extrabold text-[#C7FF41]">
      {price !== null ? `${price} €` : "Selecciona una o varias franjas"}
    </div>
  );
}
