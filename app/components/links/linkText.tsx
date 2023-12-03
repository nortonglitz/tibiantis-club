import Link, { LinkProps } from 'next/link'

type LinkTextProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & React.RefAttributes<HTMLAnchorElement>

const LinkText: React.FC<LinkTextProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Link
            className={`
            hover:text-yellow-200 
            active:text-yellow-400
            ${className}
        `}
            {...props}
        >
            {children}
        </Link>
    )
}

export default LinkText