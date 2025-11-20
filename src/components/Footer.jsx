import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
    { href: "https://youtube.com/@emnoz", icon: <FaYoutube /> },
];
const Footer = () => {
    return (
        <footer className='w-screen bg-black py-4 text-blue-50'>
            <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
                <p className='text-center text-sm md:text-left'>&copy; Manohar 2025</p>
                <div className="flex justify-center gap-4  md:justify-start">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-50 transition-colors duration-500 ease-in-out hover:text-yellow-300"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a
                    href="#privacy-policy"
                    className="text-center text-sm font-light hover:underline md:text-right"
                >
                    Privacy Policy
                </a>
            </div>
        </footer>
    )
}

export default Footer
