"use client";

import { useMemo, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  help?: string;
  textarea?: boolean;
  readOnly?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  maxLength?: number;
  title?: string;
};

type Section = {
  title: string;
  description?: string;
  fields: Field[];
};

const initialForm = {
  lp_action: "",
  lp_subid1: "",
  lp_subid2: "",
  Agent_Name: "",
  Center_Code: "",
  data_source: "",
  ip_adress: "",
  first_name: "",
  last_name: "",
  number1: "",
  email: "",
  other_cancer_type: "",
  Diagnosis_Date: "",
  verification_id: "",
  verification_id_2: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  date_of_birth: "",
  notes: "",
  external_id: "",
  currently_working_with_attorney: "",
  medication: "",
  who_is_doctor: "",
  inquiry_date: "",
  alt_phone: "",
  Proof_Of_Cancer: "",
  plaid_ID: "",
  Where_Diagnosed: "",
  Diagnosed_Address: "",
  Diagnosed_Phone: "",
  Diagnosing_Doctor: "",
  Where_Treated: "",
  Treated_Address: "",
  Treated_Phone: "",
  Treated_Doctor: "",
  Proof_of_Medication: "",
  Photo_ID_URL: "",
  Social_Security: "",
};

const sections: Section[] = [
  {
    title: "Core Details",
    description: "Required campaign and contact details.",
    fields: [
      {
        name: "Center_Code",
        label: "Center Code",
        placeholder: "Publisher ID",
        // required: true,
      },

      // { name: "Agent_Name", label: "Agent Name", placeholder: "Agent or rep" },
      // { name: "data_source", label: "Data Source", placeholder: "Source label" },

      { name: "ip_adress", label: "IP Address", placeholder: "January" },
      { name: "first_name", label: "First Name", placeholder: "Retha", required: true },
      { name: "last_name", label: "Last Name", placeholder: "Edmond", required: true },
      {
        name: "number1",
        label: "Primary Phone",
        placeholder: "(507) 200-1717",
        // required: true,
        type: "tel",
        inputMode: "tel",
        pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}",
        maxLength: 14,
        title: "Format: (XXX) XXX-XXXX",
      },
      {
        name: "email",
        label: "Email Address",
        placeholder: "john@doe.com",
        // required: true,
        type: "email",
      },
    ],
  },
  {
    title: "Identifiers",
    description: "Required verification and proof URLs.",
    fields: [
      {
        name: "Diagnosis_Date",
        label: "Diagnosis Date",
        placeholder: "MM/DD/YYYY",
        inputMode: "numeric",
        pattern: "\\d{2}/\\d{2}/\\d{4}",
        maxLength: 10,
        title: "Format: MM/DD/YYYY",
        // required: true,
      },
      {
        name: "verification_id",
        label: "TrustedForm ID",
        placeholder: "TrustedForm certification ID",
        // required: true,
      },

      // {
      //   name: "verification_id_2",
      //   label: "Jornaya ID",
      //   placeholder: "Jornaya ID",
      // },

      {
        name: "Proof_of_Medication",
        label: "Proof Of Medication URL",
        placeholder: "https://example.com",
        // required: true,
        type: "url",
      },
      {
        name: "Photo_ID_URL",
        label: "Photo ID URL",
        placeholder: "https://example.com",
        // required: true,
        type: "url",
      },
      {
        name: "Social_Security",
        label: "SSN Last 4",
        placeholder: "1234",
        inputMode: "numeric",
        pattern: "\\d{4}",
        maxLength: 4,
        title: "Last 4 digits",
        // required: true,
      },

      // {
      //   name: "Proof_Of_Cancer",
      //   label: "Proof Of Cancer URL",
      //   placeholder: "https://example.com",
      //   type: "url",
      // },

      // { name: "plaid_ID", label: "Plaid ID", placeholder: "Plaid ID" },
      // { name: "external_id", label: "External ID", placeholder: "External ID" },
    ],
  },
  // {
  //   title: "Medical Intake",
  //   description: "Symptoms, medications, and provider details.",
  //   fields: [
  //     {
  //       name: "other_cancer_type",
  //       label: "Other Cancer Type",
  //       placeholder: "Symptom or cancer type",
  //     },
  //     {
  //       name: "medication",
  //       label: "Medication",
  //       placeholder: "Medication list",
  //     },
  //     {
  //       name: "who_is_doctor",
  //       label: "Treating Doctor",
  //       placeholder: "Doctor name",
  //     },
  //     {
  //       name: "currently_working_with_attorney",
  //       label: "Working With Attorney",
  //       placeholder: "Yes or No",
  //     },
  //   ],
  // },

  // {
  //   title: "Address",
  //   fields: [
  //     { name: "street", label: "Street", placeholder: "123 Main St" },
  //     { name: "city", label: "City", placeholder: "San Diego" },
  //     {
  //       name: "state",
  //       label: "State",
  //       placeholder: "CA",
  //       inputMode: "text",
  //       pattern: "[A-Z]{2}",
  //       maxLength: 2,
  //       title: "2-letter state code",
  //     },
  //     { name: "zip", label: "ZIP", placeholder: "92101" },
  //     {
  //       name: "date_of_birth",
  //       label: "Date of Birth",
  //       placeholder: "MM/DD/YYYY",
  //       inputMode: "numeric",
  //       pattern: "\\d{2}/\\d{2}/\\d{4}",
  //       maxLength: 10,
  //       title: "Format: MM/DD/YYYY",
  //     },
  //   ],
  // },

  // {
  //   title: "Diagnosis Details",
  //   fields: [
  //     { name: "Where_Diagnosed", label: "Where Diagnosed", placeholder: "Facility name" },
  //     {
  //       name: "Diagnosed_Address",
  //       label: "Diagnosed Address",
  //       placeholder: "Facility address",
  //     },
  //     {
  //       name: "Diagnosed_Phone",
  //       label: "Diagnosed Phone",
  //       placeholder: "(775) 217-7333",
  //       type: "tel",
  //       inputMode: "tel",
  //       pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}",
  //       maxLength: 14,
  //       title: "Format: (XXX) XXX-XXXX",
  //     },
  //     {
  //       name: "Diagnosing_Doctor",
  //       label: "Diagnosing Doctor",
  //       placeholder: "Doctor name",
  //     },
  //   ],
  // },

  // {
  //   title: "Treatment Details",
  //   fields: [
  //     { name: "Where_Treated", label: "Where Treated", placeholder: "Facility name" },
  //     { name: "Treated_Address", label: "Treated Address", placeholder: "Facility address" },
  //     {
  //       name: "Treated_Phone",
  //       label: "Treated Phone",
  //       placeholder: "(605) 201-5527",
  //       type: "tel",
  //       inputMode: "tel",
  //       pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}",
  //       maxLength: 14,
  //       title: "Format: (XXX) XXX-XXXX",
  //     },
  //     { name: "Treated_Doctor", label: "Treatment Doctor", placeholder: "Doctor name" },
  //   ],
  // },

  // {
  //   title: "Tracking",
  //   fields: [
  //     {
  //       name: "inquiry_date",
  //       label: "Inquiry Date",
  //       placeholder: "MM/DD/YYYY",
  //       inputMode: "numeric",
  //       pattern: "\\d{2}/\\d{2}/\\d{4}",
  //       maxLength: 10,
  //       title: "Format: MM/DD/YYYY",
  //     },
  //     {
  //       name: "alt_phone",
  //       label: "Alt Phone",
  //       placeholder: "(940) 238-5438",
  //       type: "tel",
  //       inputMode: "tel",
  //       pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}",
  //       maxLength: 14,
  //       title: "Format: (XXX) XXX-XXXX",
  //     },
  //   ],
  // },

  // {
  //   title: "Notes",
  //   fields: [
  //     {
  //       name: "notes",
  //       label: "Notes",
  //       placeholder: "Additional context",
  //       textarea: true,
  //     },
  //   ],
  // },
];

export default function Home() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const phoneFields = useMemo(
    () =>
      new Set([
        "number1",
        "alt_phone",
        "Diagnosed_Phone",
        "Treated_Phone",
      ]),
    []
  );
  const dateFields = useMemo(
    () => new Set(["Diagnosis_Date", "date_of_birth", "inquiry_date"]),
    []
  );

  const endpoint = useMemo(
    () =>
      process.env.NEXT_PUBLIC_SUBMIT_URL ??
      "http://localhost:1001/submit-form",
    []
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    let { value } = event.target;
    if (phoneFields.has(name)) {
      const digits = value.replace(/\D+/g, "").slice(0, 10);
      if (digits.length <= 3) {
        value = digits;
      } else if (digits.length <= 6) {
        value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
          6
        )}`;
      }
    } else if (dateFields.has(name)) {
      const digits = value.replace(/\D+/g, "").slice(0, 8);
      if (digits.length <= 2) {
        value = digits;
      } else if (digits.length <= 4) {
        value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        value = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(
          4
        )}`;
      }
    } else if (name === "Social_Security") {
      value = value.replace(/\D+/g, "").slice(0, 4);
    } else if (name === "state") {
      value = value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const errorMessage =
          typeof data === "string"
            ? data
            : data?.message || "Unable to submit the form.";
        throw new Error(errorMessage);
      }

      const successMessage =
        typeof data === "string"
          ? data
          : `Status: ${data?.status || "ACCEPTED"}${data?.message ? ` — ${data.message}` : ""}`;

      setStatus("success");
      setMessage(successMessage);
      setFormData(initialForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4efe7] text-slate-900">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#ffd6a5]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#a7f3d0]/60 blur-3xl" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-600">
              Paraquat Lead Intake
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl font-[family:var(--font-display)]">
              Capture every required field and submit directly to LeadProsper.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Fixed values are enforced server-side. Complete the required fields and we will
              post to LeadProsper, then archive the submission in Google Sheets.
            </p>
          </div>
          {/* <div className="rounded-2xl border border-slate-900/10 bg-white/70 px-5 py-4 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Campaign Settings
            </p>
            <p className="mt-2 font-semibold text-slate-900">lp_campaign_id: 33016</p>
            <p className="font-semibold text-slate-900">lp_supplier_id: 105908</p>
            <p className="font-semibold text-slate-900">lp_key: de3bkm0ztjd55</p>
          </div> */}
        </section>

        <section className="rounded-3xl border border-slate-900/10 bg-white/90 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.6)] backdrop-blur sm:p-10">
          <form className="grid gap-10" onSubmit={handleSubmit}>
            {sections.map((section) => (
              <fieldset key={section.title} className="grid gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 font-[family:var(--font-display)]">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-2 text-sm text-slate-500">{section.description}</p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <label
                      key={field.name}
                      className="grid gap-2 text-sm font-semibold text-slate-700"
                    >
                      {field.label}
                      {field.required ? " *" : ""}
                      {field.textarea ? (
                        <textarea
                          name={field.name}
                          className="min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                        />
                      ) : (
                        <input
                          name={field.name}
                          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                          type={field.type || "text"}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                          readOnly={field.readOnly}
                          inputMode={field.inputMode}
                          pattern={field.pattern}
                          maxLength={field.maxLength}
                          title={field.title}
                        />
                      )}
                      {field.help && (
                        <span className="text-xs font-normal text-slate-500">
                          {field.help}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 rounded-2xl bg-slate-900 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "Submitting..." : "Send to LeadProsper"}
            </button>
          </form>

          {status !== "idle" && (
            <div
              className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                status === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : status === "error"
                  ? "border-rose-200 bg-rose-50 text-rose-900"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
              role="status"
            >
              {message}
            </div>
          )}

          {/* <div className="mt-8 text-xs text-slate-500">
            Posting to: <span className="font-semibold text-slate-700">{endpoint}</span>
          </div> */}
        </section>
      </main>
    </div>
  );
}
