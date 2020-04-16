/** @jsx jsx */
import { jsx } from 'theme-ui';
import Moment from 'react-moment';
import Link from '../../components/Link';
import JobDetail from './JobDetail';
import { useDrag } from 'react-dnd';
import Button from '../../components/Button';

export default ({
  job,
  onRemoveClick,
  onUploadClick,
  onEditClick,
  onApply,
  ...props
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'JOB', job },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      sx={{
        p: 5,
        display: 'grid',
        gridTemplateColumns: '2fr 1fr auto auto',
        gridGap: 40,
        alignItems: 'center',
        opacity: isDragging ? 0.5 : 1,
      }}
      {...props}
    >
      <JobDetail job={job}></JobDetail>
      <div>
        <Moment format="MMM D, YYYY">{job.created_at}</Moment>
      </div>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gridGap: 4,
          justifyContent: 'center',
        }}
      >
        <Link onClick={onUploadClick}>
          <i className="fas fa-upload"></i>
        </Link>
        <Link
          onClick={() =>
            job.resume ? onEditClick() : alert('Resume is not uploaded')
          }
        >
          <i className="fas fa-pen"></i>
        </Link>
        <Link
          href={job.resume || undefined}
          onClick={() => !job.resume && alert('Resume is not uploaded')}
        >
          <i className="fas fa-download"></i>
        </Link>
        <Link
          onClick={() =>
            window.confirm(`Are you user to remove ${job.title}`) &&
            onRemoveClick()
          }
        >
          <i className="fas fa-trash"></i>
        </Link>
      </div>
      <Button onClick={onApply}>Apply</Button>
    </div>
  );
};
