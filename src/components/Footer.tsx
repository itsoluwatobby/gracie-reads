import { FiLinkedin } from "react-icons/fi";
import { IconType } from "react-icons";
import { FaYoutube, FaInstagram } from 'react-icons/fa6';
// import { RiBloggerLine } from "react-icons/ri";

type SocialType = {
  link: string,
  icon: IconType,
  name: string
}

export default function Footer() {
  
  const Socials: SocialType[] = [
    { link: 'https://youtube.com/@lovelygrl?si=pY_GvHKhCVCkn4Gp', icon: FaYoutube, name: 'Youtube' },
    { link: 'https://linkedin.com/in/itsoluwatobby', icon: FiLinkedin, name: 'LinkedIn' },
    { link: 'https://twitter.com/itsoluwatobby', icon: FaInstagram, name: 'Instagram' },
    // { link: 'https://revolving.vercel.app', icon: RiBloggerLine, name: 'Blog' },
  ];
  
  return (
    <footer className="h-32 flex items-center p-4 justify-center flex-col gap-4 w-full">
      
      <h4>Lovely Audiobooks</h4>

      <div className='flex items-center gap-3'>
        {
          Socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              title={social.name}
              className='text-xl text-slate-400 hover:text-cyan-300 hover:-translate-y-[0.08rem] transition-transform'
              target='_blank'
            >
              <social.icon />
            </a>
          ))
        }
      </div>

      {/* <a></a> */}
      <span className='text-gray-300'>
        <small>copyright&copy;{new Date().getFullYear()}. Lovely Audiobooks</small>
      </span>
    </footer>
  )
}