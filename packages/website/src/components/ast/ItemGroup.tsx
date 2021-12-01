import React, { MouseEvent, useEffect, useRef } from 'react';
import { scrollIntoViewIfNeeded } from '@site/src/components/lib/scroll-into';
import clsx from 'clsx';
import styles from '@site/src/components/ast/ASTViewer.module.css';

import PropertyNameComp from '@site/src/components/ast/PropertyName';

const PropertyName = React.memo(PropertyNameComp);

export interface ItemGroupProps {
  readonly propName?: string;
  readonly value: unknown;
  readonly typeName: (data: unknown) => string | undefined;
  readonly isSelected?: boolean;
  readonly isExpanded?: boolean;
  readonly canExpand?: boolean;
  readonly onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  readonly onHover?: (e: boolean) => void;
  readonly children: JSX.Element | (JSX.Element | false)[];
}

export default function ItemGroup(props: ItemGroupProps): JSX.Element {
  const listItem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listItem.current && props.isSelected) {
      scrollIntoViewIfNeeded(listItem.current);
    }
  }, [props.isSelected, listItem]);

  return (
    <div
      ref={listItem}
      className={clsx(
        props.canExpand ? styles.expand : styles.nonExpand,
        props.isExpanded ? '' : styles.open,
        props.isSelected ? styles.selected : '',
      )}
    >
      <PropertyName
        propName={props.propName}
        typeName={props.typeName(props.value)}
        onMouseEnter={(): void => props.onHover?.(true)}
        onMouseLeave={(): void => props.onHover?.(false)}
        onClick={props.onClick}
      />
      {React.Children.map(props.children, child => child)}
    </div>
  );
}
