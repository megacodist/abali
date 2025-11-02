// src/theme/Footer/index.js
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// The default export IS the React component. We import it directly.
import WebsiteIcon from '@site/src/components/icons/website.svg';
import XIcon from '@site/src/components/icons/x.svg';
import GithubIcon from '@site/src/components/icons/github.svg';
import InstagramIcon from '@site/src/components/icons/instagram.svg';

const socialLinks = [
  {
    href: 'https://megacodist.com',
    label: 'Website',
    // We store the imported component directly.
    IconComponent: WebsiteIcon,
  },
  {
    href: 'https://x.com/megacodist',
    label: 'X (formerly Twitter)',
    IconComponent: XIcon,
  },
  {
    href: 'https://github.com/megacodist/abali',
    label: 'GitHub',
    IconComponent: GithubIcon,
  },
  {
    href: 'https://instagram.com/megacodist',
    label: 'Instagram',
    IconComponent: InstagramIcon,
  }
];

export default function FooterWrapper(props) {
  return (
    <footer className={styles.customFooter}>
      <div className={styles.footerRowOne}>
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={styles.socialIconLink}
          >
            {/* We now render the component correctly. */}
            <item.IconComponent className={styles.iconSvg} />
          </a>
        ))}
      </div>
      <div className={styles.footerRowTwo}>
        <span>Copyright © {new Date().getFullYear()} Megacodist.</span>
        <a href={useBaseUrl('/license')}>License & Attributions</a>
      </div>
    </footer>
  );
}