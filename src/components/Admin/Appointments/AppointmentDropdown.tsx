import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MoreVertical } from 'lucide-react';
import { Colors } from '../../../lib/utils';

interface AppointmentDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AppointmentDropdown({ onEdit, onDelete }: AppointmentDropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="p-2 rounded-lg transition-all hover:bg-gray-100 cursor-pointer" style={{ color: Colors.onSurfaceVariant }}>
        <MoreVertical size={18} />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl shadow-lg border z-50 overflow-hidden transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        style={{
          backgroundColor: Colors.surface,
          borderColor: "rgba(199,196,215,0.3)",
        }}
      >
        <MenuItem>
          <button
            onClick={onEdit}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-focus:bg-gray-100 transition cursor-pointer"
            style={{ color: Colors.onSurface }}
          >
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={onDelete}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-focus:bg-red-50 transition cursor-pointer"
            style={{ color: Colors.error }}
          >
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
