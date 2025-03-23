import type { FC } from 'react';
import { Country } from 'types';

type ControlProps = {
  regions: Country['region'][];
  selectedRegion?: Country['region'];
  onRegionChange: (region: Country['region']) => void;
  searchByName?: string;
  onNameChange: (name: string) => void;
};

const ControlPanel: FC<ControlProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
  searchByName,
  onNameChange,
}) => {
  return (
    <div>
      <label>
        Filter by:
        <select
          value={selectedRegion}
          onChange={({ target: { value } }) => {
            onRegionChange(value);
          }}
        >
          <option value={undefined}></option>
          {regions.map((region) => (
            <option key={region}>{region}</option>
          ))}
        </select>
      </label>
      <label>
        Search country
        <input
          type="text"
          value={searchByName}
          onChange={({ target: { value } }) => {
            onNameChange(value);
          }}
        />
      </label>
    </div>
  );
};

export default ControlPanel;
