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
            text-yellow-200
            hover:underline
            hover:underline-offset-4
            active:text-yellow-300
            ${className}
        `}
            {...props}
        >
            {children}
        </Link>
    )
}

export default LinkText