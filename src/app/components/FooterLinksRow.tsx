import { Link } from "react-router";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksRowProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinksRow({ title, links }: FooterLinksRowProps) {
  // Color mapping for hover effects
  const getHoverColor = (index: number) => {
    const colors = ['#42468C', '#98509A', '#F18B46', '#F9B437'];
    return colors[index % colors.length];
  };

  return (
    <div 
      className="w-full md:w-auto"
      style={{ 
        minWidth: '140px',
        flex: '1 1 140px'
      }}
    >
      <h4 
        className="avante-small" 
        style={{ 
          color: 'var(--avante-text-primary)', 
          fontWeight: 'var(--font-weight-semibold)',
          marginBottom: 'var(--avante-space-2)',
          textTransform: 'uppercase',
          fontSize: '11px',
          letterSpacing: '0.1em'
        }}
      >
        {title}
      </h4>
      <div className="flex flex-col gap-2 mb-2">
        {links.map((link, index) => {
          // Check if it's an internal link (starts with / and doesn't start with //)
          const isInternal = link.href.startsWith('/') && !link.href.startsWith('//');
          const Component = isInternal ? Link : 'a';
          const linkProps = isInternal ? { to: link.href } : { href: link.href };

          return (
            <Component 
              key={link.href}
              {...linkProps}
              className="avante-small" 
              style={{ 
                color: 'var(--avante-text-muted)', 
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingLeft: '0px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = getHoverColor(index);
                e.currentTarget.style.paddingLeft = '8px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--avante-text-muted)';
                e.currentTarget.style.paddingLeft = '0px';
              }}
            >
              {link.label}
            </Component>
          );
        })}
      </div>
    </div>
  );
}