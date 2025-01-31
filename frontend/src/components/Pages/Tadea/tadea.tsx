import Image from "next/image";

interface TadeaProps {
  title: string; 
  message: string;
  timePostedInMinutes: number;
  images: string[];
  index: number;
}

const LostAndFoundCard = ({ title, message, timePostedInMinutes, images, index }: TadeaProps) => {

  const timePosted = () => {
    if (timePostedInMinutes < 60) {
      return `${timePostedInMinutes} minutos atrás`;
    }
    
    const hours = Math.floor(timePostedInMinutes / 60);
    const minutes = timePostedInMinutes % 60;

    if (minutes === 0) {
      return `${hours} horas atrás`;
    } else {
      return `${hours} horas e ${minutes} minutos atrás`;
    }
  };

  const getGridColumns = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    if (images.length === 3) return "grid-cols-2";
    return "grid-cols-2"; // Para 3 ou mais imagens
  };

  const visibleImages = images.slice(0, 3);

  return (
    <div className="group grid grid-cols-3 gap-4 max-w-2xl mx-auto my-4 h-64 hover:border-gray-900 hover:cursor-pointer hover:text-gray-900 dark:text-dark-text dark:border-white">
      {visibleImages.length > 0 && (
        <div className={`grid ${getGridColumns()} gap-2 border-2 border-gray-300 rounded-lg p-4 h-full`}>
          {visibleImages.length === 3 ? (
            <>
              <div className="col-span-1 h-full">
                <Image
                  src={visibleImages[0]}
                  alt={`Item 1`}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>
  
              <div className="flex flex-col gap-2 h-full">
                {visibleImages.slice(1).map((imgSrc, index) => (
                  <Image
                    key={index + 1}
                    src={imgSrc}
                    alt={`Item ${index + 2}`}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover h-full w-full"
                  />
                ))}
              </div>
            </>
          ) : (
            visibleImages.map((imgSrc, index) => (
              <Image
                key={index}
                src={imgSrc}
                alt={`Item ${index + 1}`}
                width={150}
                height={150}
                className="rounded-lg object-cover h-full w-full"
              />
            ))
          )}
        </div>
      )}

      <div className="col-span-2 flex flex-col justify-between h-full p-2">
        <div>
          <div className="text-gray-500 text-sm">{timePosted()}</div>
          <div className="text-lg font-semibold border-b-0 group-hover:underline dark:text-gray-200">
            {index}. {title}
          </div>
        </div>
        <div className="text-gray-500 overflow-hidden text-ellipsis">
          <p className="pt-10">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundCard;
