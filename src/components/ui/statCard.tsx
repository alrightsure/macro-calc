interface StatCardProps {
    label: string;
    value: number;
    unit?: string;
}

export const StatCard = ({ label, value, unit }: StatCardProps) => (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {value}
            <span className="ml-2 text-sm font-medium text-gray-500">{unit}</span>
        </dd>
    </div>
);
