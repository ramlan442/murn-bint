import Link from "next/link";

const Item = ({href, title}: {href: string, title: string}) => <Link href={href} className="hover:underline uppercase text-white">{title}</Link>

export const Footer = () => {
    return ( 
        <div className="flex justify-center items-center gap-3 text-xs group/link">
            {
                [
                    {
                        href: "https://wojax.xyz/",
                        title: "wojax"
                    },
                    {
                        href: "https://www.dragoneyes.xyz/",
                        title: "Dragon Eyes"
                    }
                ].map(
                    (v, i) => (
                        <Item
                         key={`item_footer_${i}`}
                         href={v.href}
                         title={v.title}
                        />
                    )
                )
            }
        </div>
     );
}
 