import "./globals.css";
import { Footer, NavBar } from "@/components";

export const metadata = {
  title: "SharpList",
  description: "Quickly create a shoping list based on premade recipies!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='relative m-1 -z-50' 
            style={{
              //backgroundImage: `url('/wallpaper-that-says-desert-it.jpg')`,
              //backgroundImage: `url('/cool-background.png')`,
              backgroundImage: `url('/pexels-johannes-plenio-1103970.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              height: '100%',
            }}>
        {children}
      </body>
    </html>
  );
}