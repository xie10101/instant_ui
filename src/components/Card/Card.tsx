import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './_style.scss';

export interface CardProps {
  title?: string;
  className?: string;
  children?: ReactNode;
  size?: 'small' | 'large';
}

interface CardInterface extends FC<CardProps> {
  Content: FC<{ children: ReactNode; className?: string }>;
  Footer: FC<{ children: ReactNode; className?: string }>;
}

const Card: CardInterface = (props) => {
  const { title, className, children, size } = props;
  const classes = classNames(`card card-${size}`, className);

  return (
    <div className={classes}>
      {title && <div className="card-header">{title}</div>}
      {children}
    </div>
  );
};

const CardContent: FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const classes = classNames('card-content', className);
  return <div className={classes}>{children ? children : null}</div>;
};

const CardFooter: FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const classes = classNames('card-footer', className);
  return <div className={classes}>{children ? children : null}</div>;
};

Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
