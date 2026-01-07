// components/DynamicFaIcon.tsx
import * as FaIcons from 'react-icons/fa';

interface Props {
    name: string | null; // ejemplo: 'FaHome', 'FaUser'
    size?: number;
    className?: string;
    btnInput?: boolean;
    onClick?: () => void;
}

const DynamicFaIcon: React.FC<Props> = ({ name, size = 20, className, btnInput = false, onClick }) => {
    name = name ?? 'FaX';
    const Icon = FaIcons[name as keyof typeof FaIcons];

    let click = 'cursor-pointer hover:text-gray-500 active:scale-90 transition-transform duration-75'

    if (!Icon) return null;

    return <Icon onClick={onClick} size={size} className={`${btnInput ? 'text-gray-400' : 'text-gray-500'} ${className} ${btnInput ? click : ''}`} />;
};

export default DynamicFaIcon;
