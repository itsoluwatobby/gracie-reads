import { BookOpen } from 'lucide-react';

// type SocialType = {
//   link: string,
//   icon: IconType,
//   name: string
// }

export default function Footer() {
  
  // const Socials: SocialType[] = [
  //   { link: 'https://youtube.com/@lovelygrl?si=pY_GvHKhCVCkn4Gp', icon: FaYoutube, name: 'Youtube' },
  //   { link: 'https://linkedin.com/in/itsoluwatobby', icon: FiLinkedin, name: 'LinkedIn' },
  //   { link: 'https://twitter.com/itsoluwatobby', icon: FaInstagram, name: 'Instagram' },
  //   // { link: 'https://revolving.vercel.app', icon: RiBloggerLine, name: 'Blog' },
  // ];
  
  return (
    <footer className="bg-sky-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="flex maxMobile:flex-col maxMobile:gap-y-6 items-center justify-between">
          <div className="maxMobile:self-start flex items-center">
            <BookOpen className="mr-2" size={24} />
            <span className="text-xl font-bold">Lovely Audios</span>
          </div>
          <p className="maxMobile:self-end text-sky-100">&copy;{new Date().getFullYear()}. Lovely Audios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}