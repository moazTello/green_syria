import React, { useState, useEffect } from 'react';

const ImageUploader = ({ setValue, errors, backendLogo, backendImages, logo, images, details}) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (backendLogo) {
      const logoImage = document.createElement('img');
      logoImage.src = backendLogo;
      setLogoPreview(backendLogo);
      setValue('LogoImage', logoImage, { shouldValidate: true });
    }
    if (backendImages && backendImages.length > 0) {
      const images = backendImages.map((img) => {
        const imageElement = document.createElement('img');
        imageElement.src = img?.image;
        return imageElement;
      });
      setImagePreviews(backendImages.map((img) => img.image));
      setValue('Images', images, { shouldValidate: true });
    }
  }, [backendLogo, backendImages, setValue]);
  const handleLogoChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setLogoPreview(URL.createObjectURL(file));
      setValue('LogoImage', file, { shouldValidate: true });
    }
  };
  const handleImagesChange2 = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...previews]);
    setValue('Images', files, { shouldValidate: true });
  };

  return (
    <div>
      {!images && <div className="w-full flex flex-col justify-center items-center my-4">
        {!details && <label
          htmlFor="logo-image"
          className="w-full py-3 fontReg rounded-lg text-xs md:text-sm hover:bg-white hover:text-[#55B063] text-center text-white bg-[#55B063] cursor-pointer"
        >
          {logoPreview ? 'تعديل اللوغو' : 'إضافة لوغو'}
        </label>}
        <input id="logo-image" type="file" className="hidden" onChange={handleLogoChange} />
        {errors?.LogoImage && <p>{errors?.LogoImage?.message}</p>}
        {logoPreview && <img className="my-6 h-32 rounded-lg" src={logoPreview} alt="logo" />}
      </div>}
      {!logo && <div className="w-full flex flex-col justify-center items-center mb-4">
        {!details && <label
          htmlFor="images2"
          className="w-full py-3 fontReg rounded-lg my-5 text-xs md:text-sm hover:bg-white hover:text-[#55B063] text-center text-white bg-[#55B063] cursor-pointer"
        >
         {imagePreviews?.length > 0  ? 'تعديل كافة الصور' : 'إضافة صور'}
        </label>}
        <input id="images2" multiple type="file" className="hidden" onChange={handleImagesChange2} />
        {errors?.Images && <p>{errors?.Images.message}</p>}
        {imagePreviews?.length > 0 && (
          <div className="flex flex-wrap gap-4 my-4">
            {imagePreviews?.map((src, index) => (
              <img key={index} src={src} alt={`image-${index}`} className="w-64 h-32 object-cover rounded-lg" />
            ))}
          </div>
        )}
      </div>}
    </div>
  );
};

export default ImageUploader;
