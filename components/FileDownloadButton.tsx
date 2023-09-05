import { ReactNode } from "react";

export interface FileButtonProps
{
    children?: ReactNode;
    name?: string;
    data: JSON;
}

const FileDownloadButton = ({children, name, data}: FileButtonProps) => {

  const handleDownload = () => {
    const dataToWrite = 'To jest tekst, który zostanie zapisany w pliku.';
    const blob = new Blob([dataToWrite], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = name || "nazwa pliku.JSON";
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button onClick={handleDownload}>{children}</button>
  );
}

export default FileDownloadButton;
