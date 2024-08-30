const validateFile = (file: File): { isValid: boolean; message: string } => {
  const fileTypeRegex = /^image\/.+$/;
  const maxSizeInMB = 3;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  // Check file type
  if (!fileTypeRegex.test(file.type)) {
    return {
      isValid: false,
      message: "Invalid file type. Please select an image file.",
    };
  }

  // Check file size
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      message: `File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`,
    };
  }

  // File is valid
  return { isValid: true, message: "File is valid." };
};

export { validateFile };
