import classNames from 'classnames';
import './_style.scss';
interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
}
const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
}: FormItemProps) => {
  const instantFormItemClass = classNames('instant-form-item', {
    'instant-from-item-label': !label,
  });

  const instantFormItemLabelClass = classNames('instant-form-item-label', {
    'form-label-colon': label && !label.endsWith(':') && !label.endsWith('：'),
  });

  return (
    <div className={instantFormItemClass}>
      <span className={instantFormItemLabelClass}>{label}</span>
      <div className="instant-form-item-control">{children}</div>
    </div>
  );
};

export { FormItem };

/**
 * const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
}: FormItemProps) => {
 */
