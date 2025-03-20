import { cn } from 'utils/cn';

export default function Footer() {
  return (
    <footer
      className={cn(
        'border-t flex justify-between items-center py-1 px-4 bg-gray-200',
        {}
      )}
    >
      <img
        src="https://old.rs.school/images/rs_school.svg"
        alt="rs-logo"
        width={100}
      />
      <strong className="space-x-2">
        <a href="https://github.com/SAK-RS">SAK74 ©</a>

        <span className="">2025</span>
      </strong>
    </footer>
  );
}
