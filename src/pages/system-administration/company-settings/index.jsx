import React, { useState } from "react";
import {
  GoGlobe,
  GoHome,
  GoLocation,
  GoUpload,
  GoCheck,
  GoOrganization,
} from "react-icons/go";
import Button from "@components/buttons/button";
import SelectInput from "@components/selections/selectioninput";
import Card from "@components/containers/card";

// --- 1. Local Helper: Standard Text Input ---
// Defined locally to ensure it matches the style of your SelectInput perfectly
const SettingsInput = ({ label, icon: Icon, type = "text", ...props }) => {
  return (
    <div>
      {label && (
        <p className="text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
          {label}
        </p>
      )}
      <div className="border border-slate-300 dark:border-slate-600 rounded-md flex items-center bg-white dark:bg-slate-800 focus-within:border-blue-500 transition-colors">
        {Icon && (
          <div className="pl-3 text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          className="w-full p-2.5 text-sm bg-transparent outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400"
          {...props}
        />
      </div>
    </div>
  );
};

// --- 2. Main Component ---

export default function CompanySettingsPage() {
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "Acme Corp Ltd.",
    taxId: "TAX-88221-X",
    website: "https://acme.com",
    email: "admin@acme.com",
    phone: "+1 (555) 0123-456",
    address: "123 Innovation Dr, Tech City",
    currency: "USD",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
  });

  // Logo State (Mock Preview)
  const [logoPreview, setLogoPreview] = useState(
    "https://via.placeholder.com/150"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoading(true);
    // Mock API Save
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  // Dropdown Options
  const currencyOptions = [
    { label: "USD - US Dollar ($)", value: "USD" },
    { label: "EUR - Euro (€)", value: "EUR" },
    { label: "GBP - British Pound (£)", value: "GBP" },
    { label: "SGD - Singapore Dollar (S$)", value: "SGD" },
  ];

  const timezoneOptions = [
    { label: "(UTC-08:00) Pacific Time", value: "UTC-8" },
    { label: "(UTC-05:00) Eastern Time", value: "UTC-5" },
    { label: "(UTC+00:00) London", value: "UTC+0" },
    { label: "(UTC+08:00) Singapore/China", value: "UTC+8" },
  ];

  const dateOptions = [
    { label: "MM/DD/YYYY (12/31/2023)", value: "MM/DD/YYYY" },
    { label: "DD/MM/YYYY (31/12/2023)", value: "DD/MM/YYYY" },
    { label: "YYYY-MM-DD (2023-12-31)", value: "YYYY-MM-DD" },
  ];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Company Settings
          </h1>
          <p className="text-sm text-slate-500">
            Configure branding, localization, and contact details.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            icon={loading ? null : GoCheck}
            color="green"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Left Column: Branding & General --- */}
        <div className="space-y-6 lg:col-span-2">
          {/* Card: General Information */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <GoOrganization className="text-slate-400" /> General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsInput
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
              />
              <SettingsInput
                label="Tax / Registration ID"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="e.g. 123-456-789"
              />
              <div className="md:col-span-2">
                <SettingsInput
                  label="Website"
                  icon={GoGlobe}
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Card: Contact Details */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <GoLocation className="text-slate-400" /> Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <SettingsInput
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <SettingsInput
                  label="Office Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street, City, Zip Code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Branding & Localization --- */}
        <div className="space-y-6">
          {/* Card: Logo Upload */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <GoOrganization className="text-slate-400" /> Branding
            </h3>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer group">
              <div className="w-24 h-24 mb-3 relative">
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-contain rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <GoUpload />
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Click to upload or drag & drop
                <br />
                <span className="text-[10px] text-slate-400">
                  PNG, JPG up to 2MB
                </span>
              </p>
            </div>
          </div>

          {/* Card: Localization */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <GoGlobe className="text-slate-400" /> Localization
            </h3>
            <div className="space-y-4">
              <SelectInput
                label="System Currency"
                value={formData.currency}
                onChange={(e) => handleSelectChange("currency", e.target.value)}
                options={currencyOptions}
                placeholder="Select Currency"
              />

              <SelectInput
                label="Timezone"
                value={formData.timezone}
                onChange={(e) => handleSelectChange("timezone", e.target.value)}
                options={timezoneOptions}
                placeholder="Select Timezone"
              />

              <SelectInput
                label="Date Format"
                value={formData.dateFormat}
                onChange={(e) =>
                  handleSelectChange("dateFormat", e.target.value)
                }
                options={dateOptions}
                placeholder="Select Date Format"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
