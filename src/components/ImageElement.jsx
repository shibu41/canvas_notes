export const ImageElement = ({ element }) => (
  <img
    src={element.src}
    alt="Canvas element"
    className="w-full h-full object-cover rounded border-2 border-gray-300"
    draggable={false}
  />
);
