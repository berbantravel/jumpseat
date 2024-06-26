'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface DropdownItemProps {
  icon?: React.ReactNode;
  text: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItemProps[];
  triggerIcon?: React.ReactNode; // New prop for custom icon
}

const Dropdown: React.FC<DropdownProps> = ({ items, triggerIcon }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full text-text-black-secondary hover:text-text-black-primary">
          <span className="sr-only">Open options</span>
          <div
            className="inline-flex items-center space-x-2 rounded-full py-0 pl-4 text-gray-400 hover:text-gray-500"
          >
            {triggerIcon ? triggerIcon : <EllipsisHorizontalIcon className="h-6 w-auto text-text-black-primary" />}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 cursor-pointer">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div
                    onClick={item.onClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'captionRegular flex items-center px-6 py-2 text-sm text-secondary-base w-full'
                    )}
                  >
                    {item.icon && <span className="mr-3 h-5 w-5">{item.icon}</span>}
                    {item.text}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
