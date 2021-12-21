import { ComponentProps } from 'react';

import cx from 'classnames';

type ListProps = {
  header?: React.ReactNode;
  addItem?: React.ReactNode;
};

export const List: React.FC<ListProps> = ({ header, addItem, children }) => (
  <div className="flex flex-col max-w-sm border-r min-w-sm border-light">
    {header}
    <ul className="flex flex-col flex-grow pb-8 overflow-y-auto margin-0">
      {children}
      {addItem}
    </ul>
  </div>
);

export const ListHeader: React.FC = ({ children }) => {
  return <div className="p-4 text-xl border-b-4 border-dark-alternate">{children}</div>;
};

export const ListItem: React.FC<ComponentProps<'li'>> = ({ className, ...props }) => (
  <li
    className={cx(
      'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors border-dark-alternate border-b-2',
      className,
    )}
    {...props}
  />
);

export const AddItemButton: React.FC<ComponentProps<'button'>> = ({ children, ...props }) => (
  <li className="self-center py-4">
    <button className="flex flex-row items-center self-center fill-muted gap-2 text-muted" {...props}>
      <svg viewBox="0 0 24 24" width={24} height={24}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      {children}
    </button>
  </li>
);
