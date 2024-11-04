import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { User } from '../types/user';
import { useUserStore } from '../store/userStore';
import { Plus, Trash2, UserPlus } from 'lucide-react';

export default function RegistrationForm() {
  const addUser = useUserStore((state) => state.addUser);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      gender: '',
      city: '',
      institution: '',
      department: '',
      position: '',
      telephone: '',
      extension: '',
      mobileNumbers: [''],
      emails: [''],
    },
  });

  const { fields: mobileFields, append: appendMobile, remove: removeMobile } = 
    useFieldArray({ control, name: 'mobileNumbers' });
  
  const { fields: emailFields, append: appendEmail, remove: removeEmail } = 
    useFieldArray({ control, name: 'emails' });

  const onSubmit = (data: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    addUser(newUser);
    reset();
    alert('Registration successful!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <UserPlus className="w-8 h-8" />
          <h2>User Registration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Institution</label>
            <input
              {...register('institution', { required: 'Institution is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.institution && (
              <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              {...register('department', { required: 'Department is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position/Role</label>
            <input
              {...register('position', { required: 'Position is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telephone</label>
            <input
              {...register('telephone', { required: 'Telephone is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.telephone && (
              <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Extension</label>
            <input
              {...register('extension')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Mobile Numbers</label>
              <button
                type="button"
                onClick={() => appendMobile('')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Number
              </button>
            </div>
            {mobileFields.map((field, index) => (
              <div key={field.id} className="flex mt-2">
                <input
                  {...register(`mobileNumbers.${index}` as const, {
                    required: 'Mobile number is required',
                  })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMobile(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
              <button
                type="button"
                onClick={() => appendEmail('')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Email
              </button>
            </div>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex mt-2">
                <input
                  {...register(`emails.${index}` as const, {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmail(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register User
          </button>
        </div>
      </div>
    </form>
  );
}