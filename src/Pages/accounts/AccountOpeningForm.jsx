import React, { useEffect, useState, useRef } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function AccountOpeningForm() {
  useEffect(() => {
    document.title = "Account Opening Form - Personal";
    const savedData = localStorage.getItem("urbankFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    surname: "",
    mothersMaidenName: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    nationality: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    houseNumber: "",
    streetName: "",
    city: "",
    residentialLGA: "",
    residentialState: "",
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
    idIssueDate: "",
    idExpiryDate: "",
    bvn: "",
    nin: "",
    tin: "",
    employmentStatus: "",
    employerName: "",
    employerAddress: "",
    annualIncome: "",
    nokFirstName: "",
    nokMiddleName: "",
    nokSurname: "",
    nokGender: "",
    nokDOB: "",
    nokRelationship: "",
    nokPhone: "",
    nokEmail: "",
    nokAddress: "",
    accountType: "",
    cardType: "",
    electronicBanking: [],
    alertPreference: [],
    mandateFirstName: "",
    mandateMiddleName: "",
    mandateSurname: "",
    mandateIdType: "",
    mandateIdNumber: "",
    mandatePhone: "",
    mandateSignature: null,
    mandateDate: "",
    declarationName: "",
    declarationSignature: null,
    declarationDate: "",
    passportPhoto: null,
    uploadedIdFile: null,
    utilityBill: null,
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("urbankFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (file) {
        if (file.size > maxSize) {
          setErrors((prev) => ({
            ...prev,
            [name]: "File size must not exceed 2MB.",
          }));
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: file }));
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    } else if (type === "checkbox" && name === "electronicBanking") {
      setFormData((prev) => ({
        ...prev,
        electronicBanking: checked
          ? [...prev.electronicBanking, value]
          : prev.electronicBanking.filter((item) => item !== value),
      }));
    } else if (type === "checkbox" && name === "alertPreference") {
      setFormData((prev) => ({
        ...prev,
        alertPreference: checked
          ? [...prev.alertPreference, value]
          : prev.alertPreference.filter((item) => item !== value),
      }));
    } else if (name === "annualIncome") {
      setFormData((prev) => ({
        ...prev,
        annualIncome: parseInt(value, 10),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const phoneRegex = /^(\+234|0)(70|80|81|90|91)\d{8}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    // Basic identity
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.mothersMaidenName)
      newErrors.mothersMaidenName = "Mother's Maiden Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    else if (new Date(formData.dateOfBirth) > new Date())
      newErrors.dateOfBirth = "Date of Birth cannot be in the future";

    // Contact and address
    if (!formData.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    if (!formData.nationality)
      newErrors.nationality = "Nationality is required";
    if (!formData.stateOfOrigin)
      newErrors.stateOfOrigin = "State of origin is required";
    if (!formData.lgaOfOrigin)
      newErrors.lgaOfOrigin = "LGA of origin is required";
    if (!formData.houseNumber)
      newErrors.houseNumber = "House number is required";
    if (!formData.streetName) newErrors.streetName = "Street name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.residentialLGA)
      newErrors.residentialLGA = "Residential LGA is required";
    if (!formData.residentialState)
      newErrors.residentialState = "Residential state is required";

    // Employment
    if (!formData.employmentStatus)
      newErrors.employmentStatus = "Employment status is required";
    if (!formData.employerName)
      newErrors.employerName = "Employer name is required";
    if (!formData.employerAddress)
      newErrors.employerAddress = "Employer address is required";
    if (!formData.annualIncome)
      newErrors.annualIncome = "Annual income is required";

    // Contact info
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone.trim()))
      newErrors.phone = "Invalid phone number format";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    // ID Info
    if (!formData.idType) newErrors.idType = "Select an ID type";
    if (!formData.idNumber) newErrors.idNumber = "ID number is required";
    if (!formData.idIssueDate)
      newErrors.idIssueDate = "ID issue date is required";
    if (!formData.idExpiryDate)
      newErrors.idExpiryDate = "ID expiry date is required";
    else if (
      formData.idIssueDate &&
      new Date(formData.idIssueDate) > new Date(formData.idExpiryDate)
    )
      newErrors.idExpiryDate = "Expiry date must be after issue date";

    // BVN/NIN/TIN
    if (!formData.bvn) newErrors.bvn = "BVN is required";
    else if (formData.bvn.length !== 11)
      newErrors.bvn = "BVN must be exactly 11 digits";
    if (!formData.nin) newErrors.nin = "NIN is required";
    else if (formData.nin.length !== 11)
      newErrors.nin = "NIN must be exactly 11 digits";
    if (formData.tin && formData.tin.length !== 10)
      newErrors.tin = "TIN must be exactly 10 digits";

    // Uploads
    if (!formData.passportPhoto)
      newErrors.passportPhoto = "Upload your passport photo";
    if (!formData.uploadedIdFile)
      newErrors.uploadedIdFile = "Upload your ID document";
    if (!formData.utilityBill)
      newErrors.utilityBill = "Upload your utility bill";

    // NOK
    if (!formData.nokFirstName)
      newErrors.nokFirstName = "Next of kin first name is required";
    if (!formData.nokSurname)
      newErrors.nokSurname = "Next of kin surname is required";
    if (!formData.nokGender)
      newErrors.nokGender = "Next of kin gender is required";
    if (!formData.nokDOB)
      newErrors.nokDOB = "Next of kin date of birth is required";
    if (!formData.nokRelationship)
      newErrors.nokRelationship = "Next of kin relationship is required";
    if (!formData.nokPhone?.trim())
      newErrors.nokPhone = "Next of kin phone number is required";
    else if (!phoneRegex.test(formData.nokPhone.trim()))
      newErrors.nokPhone = "Invalid phone number format";
    if (!formData.nokEmail)
      newErrors.nokEmail = "Next of kin email is required";
    else if (!emailRegex.test(formData.nokEmail))
      newErrors.nokEmail = "Please enter a valid next of kin email address";
    if (!formData.nokAddress)
      newErrors.nokAddress = "Next of kin address is required";

    // Account
    if (!formData.accountType)
      newErrors.accountType = "Account type is required";

    // Mandate
    if (!formData.mandateFirstName)
      newErrors.mandateFirstName = "Mandate first name is required";
    if (!formData.mandateSurname)
      newErrors.mandateSurname = "Mandate surname is required";
    if (!formData.mandateIdType)
      newErrors.mandateIdType = "Mandate ID type is required";
    if (!formData.mandateIdNumber)
      newErrors.mandateIdNumber = "Mandate ID number is required";
    if (!formData.mandatePhone?.trim())
      newErrors.mandatePhone = "Mandate phone number is required";
    else if (!phoneRegex.test(formData.mandatePhone.trim()))
      newErrors.mandatePhone = "Invalid phone number format";
    if (!formData.mandateSignature)
      newErrors.mandateSignature = "Mandate signature is required";
    if (!formData.mandateDate)
      newErrors.mandateDate = "Mandate date is required";

    // Declaration
    if (!formData.declarationName)
      newErrors.declarationName = "Declaration name is required";
    if (!formData.declarationSignature)
      newErrors.declarationSignature = "Declaration signature is required";
    if (!formData.declarationDate)
      newErrors.declarationDate = "Declaration date is required";

    // ✅ Normalize full name (with optional middle name)
    const buildFullName = (first, middle, surname) => {
      return `${first?.trim()} ${middle?.trim() || ""} ${surname?.trim()}`
        .replace(/\s+/g, " ")
        .toLowerCase()
        .trim();
    };

    // Personal full name
    const personalFullName = buildFullName(
      formData.firstName,
      formData.middleName,
      formData.surname
    );

    // Mandate full name
    const mandateFullName = buildFullName(
      formData.mandateFirstName,
      formData.mandateMiddleName,
      formData.mandateSurname
    );

    // Declaration name
    const declarationFullName = formData.declarationName
      ?.trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    // Compare
    if (
      mandateFullName &&
      personalFullName &&
      mandateFullName !== personalFullName
    ) {
      newErrors.mandateFirstName = "Mandate name must match your full name";
      newErrors.mandateSurname = "Mandate name must match your full name";
    }

    if (
      declarationFullName &&
      personalFullName &&
      declarationFullName !== personalFullName
    ) {
      newErrors.declarationName = "Declaration name must match your full name";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const inputRefs = {
    // Basic Identity
    title: useRef(null),
    firstName: useRef(null),
    surname: useRef(null),
    mothersMaidenName: useRef(null),
    gender: useRef(null),
    dateOfBirth: useRef(null),

    // Contact and Address
    maritalStatus: useRef(null),
    nationality: useRef(null),
    stateOfOrigin: useRef(null),
    lgaOfOrigin: useRef(null),
    houseNumber: useRef(null),
    streetName: useRef(null),
    city: useRef(null),
    residentialLGA: useRef(null),
    residentialState: useRef(null),

    // Employment
    employmentStatus: useRef(null),
    employerName: useRef(null),
    employerAddress: useRef(null),
    annualIncome: useRef(null),

    // Contact Info
    phone: useRef(null),
    email: useRef(null),

    // ID Info
    idType: useRef(null),
    idNumber: useRef(null),
    idIssueDate: useRef(null),
    idExpiryDate: useRef(null),

    // BVN/NIN/TIN
    bvn: useRef(null),
    nin: useRef(null),
    tin: useRef(null),

    // Uploads
    passportPhoto: useRef(null),
    uploadedIdFile: useRef(null),
    utilityBill: useRef(null),

    // Next of Kin
    nokFirstName: useRef(null),
    nokSurname: useRef(null),
    nokGender: useRef(null),
    nokDOB: useRef(null),
    nokRelationship: useRef(null),
    nokPhone: useRef(null),
    nokEmail: useRef(null),
    nokAddress: useRef(null),

    // Account
    accountType: useRef(null),

    // Mandate
    mandateFirstName: useRef(null),
    mandateSurname: useRef(null),
    mandateIdType: useRef(null),
    mandateIdNumber: useRef(null),
    mandatePhone: useRef(null),
    mandateSignature: useRef(null),
    mandateDate: useRef(null),

    // Declaration
    declarationName: useRef(null),
    declarationSignature: useRef(null),
    declarationDate: useRef(null),
  };
  const [successMessage, setSuccessMessage] = useState("");

  const normalizeErrors = (serverErrors) => {
    const flattened = {};
    for (const key in serverErrors) {
      if (Array.isArray(serverErrors[key])) {
        flattened[key] = serverErrors[key][0]; // Only first error message
      } else {
        flattened[key] = serverErrors[key];
      }
    }
    return flattened;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      firstName: "",
      middleName: "",
      surname: "",
      mothersMaidenName: "",
      gender: "",
      dateOfBirth: "",
      maritalStatus: "",
      nationality: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      houseNumber: "",
      streetName: "",
      city: "",
      residentialLGA: "",
      residentialState: "",
      phone: "",
      email: "",
      idType: "",
      idNumber: "",
      idIssueDate: "",
      idExpiryDate: "",
      bvn: "",
      nin: "",
      tin: "",
      employmentStatus: "",
      employerName: "",
      employerAddress: "",
      annualIncome: "",
      nokFirstName: "",
      nokMiddleName: "",
      nokSurname: "",
      nokGender: "",
      nokDOB: "",
      nokRelationship: "",
      nokPhone: "",
      nokEmail: "",
      nokAddress: "",
      accountType: "",
      cardType: "",
      electronicBanking: [],
      alertPreference: [],
      mandateFirstName: "",
      mandateMiddleName: "",
      mandateSurname: "",
      mandateIdType: "",
      mandateIdNumber: "",
      mandatePhone: "",
      mandateSignature: null,
      mandateDate: "",
      declarationName: "",
      declarationSignature: null,
      declarationDate: "",
      passportPhoto: null,
      uploadedIdFile: null,
      utilityBill: null,
    });

    // ✅ Clear file inputs via ref (add this!)
    if (inputRefs.passportPhoto && inputRefs.passportPhoto.current) {
      inputRefs.passportPhoto.current.value = null;
    }
    if (inputRefs.uploadedIdFile && inputRefs.uploadedIdFile.current) {
      inputRefs.uploadedIdFile.current.value = null;
    }
    if (inputRefs.utilityBill && inputRefs.utilityBill.current) {
      inputRefs.utilityBill.current.value = null;
    }
    if (inputRefs.mandateSignature && inputRefs.mandateSignature.current) {
      inputRefs.mandateSignature.current.value = null;
    }
    if (
      inputRefs.declarationSignature &&
      inputRefs.declarationSignature.current
    ) {
      inputRefs.declarationSignature.current.value = null;
    }

    // ✅ Clear form errors (optional but good)
    setErrors({});
  };

  const fieldLabel = (field) => {
    const labels = {
      nin: "NIN",
      bvn: "BVN",
    };
    return labels[field] || field;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const ref = inputRefs[firstErrorField];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current.focus();
      }
      setIsLoading(false);
      return;
    }

    const sanitizedFormData = {
      ...formData,
      gender: formData.gender?.toLowerCase(),
      maritalStatus: formData.maritalStatus?.toLowerCase(),
      employmentStatus: formData.employmentStatus?.toLowerCase(),
      nokGender: formData.nokGender?.toLowerCase(),
    };

    const data = new FormData();
    for (const key in sanitizedFormData) {
      const value = sanitizedFormData[key];
      if (value instanceof File || typeof value === "string") {
        data.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          data.append(`${key}[${index}]`, item);
        });
      } else {
        data.append(key, value);
      }
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (
        res.status === 200 ||
        res.data?.message?.toLowerCase().includes("success")
      ) {
        // ✅ Immediately clear the form
        resetForm();

        // ✅ Scroll to the top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // ✅ Show success message immediately
        setSuccessMessage(" Your account request has been submitted!");
        console.log("Success message set!");

        // ✅ Clear success message after 10 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 10000);
      }
    } catch (error) {
      console.error("Submission error:", error);

      const responseData = error.response?.data;

      // ✅ 1. Laravel-style field errors — even if status is 400
      if (responseData?.errors) {
        const flatErrors = normalizeErrors(responseData.errors);
        setErrors(flatErrors);

        const firstField = Object.keys(flatErrors)[0];
        const ref = inputRefs[firstField];
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
          ref.current.focus();
        }

        setIsLoading(false); // ✅ stops button spinner
        return; // ✅ Stop here — field errors handled
      }

      // ✅ 2. SQL Duplicate Entry (non-field error, scroll to field if possible)
      if (
        responseData?.error?.includes("Duplicate entry") &&
        responseData?.error?.includes("_unique")
      ) {
        const match = responseData.error.match(/for key '.*?_(.*?)_unique'/);
        const field = match?.[1];

        if (field) {
          setErrors((prev) => ({
            ...prev,
            [field]: `${fieldLabel(
              field
            )} is already linked to a registered user.`,
          }));

          const ref = inputRefs[field];
          if (ref?.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
            ref.current.focus();
          }

          setIsLoading(false); // ✅ ensure spinner stops
          return;
        } else {
          setErrorMessage(
            "A duplicate entry was detected, but the field could not be identified."
          );
        }

        // ✅ 3. Laravel-level error message
      } else if (responseData?.message) {
        setErrorMessage(responseData.message);

        // ✅ 4. Unknown fallback error
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      // ✅ Scroll to top and reset loading for all general errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setErrorMessage(""), 10000);
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    window.print();
    const element = formRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("URBank_Account_Opening_Form.pdf");
  };

  const inputClass =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600";

  const handleFileChange = (e) => {
    const { name, files, type } = e.target;

    if (!files || files.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [name]: "No file selected",
      }));
      return;
    }

    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (type === "file") {
      // ✅ Check file size
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [name]: "File size must not exceed 2MB",
        }));
        return;
      }

      // ✅ Update form data with the file
      setFormData((prev) => ({ ...prev, [name]: file }));

      // ✅ Clear any existing error
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="max-w-6xl mx-auto mb-24 mt-24 px-4 pb-4 md:pt-4 md:px-8 md:pb-8 space-y-10 bg-white print:bg-white print:p-6 shadow-lg rounded-xl text-sm print:text-black"
      >
        <h2 className="text-3xl pt-8 font-bold text-center">
          URBank Account Opening Form
        </h2>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
            {errorMessage}
          </div>
        )}

        {/* PERSONAL INFORMATION */}
        <section>
          <h3 className="text-xl font-semibold mb-4">
            1. Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <select
                id="title"
                name="title"
                className={inputClass}
                ref={inputRefs.title}
                value={formData.title || ""}
                onChange={handleChange}
              >
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
                <option value="Chief">Chief</option>
              </select>

              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>

            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                className={inputClass}
                ref={inputRefs.firstName}
                value={formData.firstName}
                onChange={handleChange}
              />

              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle Name
              </label>
              <input
                id="middleName"
                name="middleName"
                className={inputClass}
                onChange={handleChange}
                value={formData.middleName}
              />
            </div>

            {/* Surname */}
            <div>
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                className={inputClass}
                ref={inputRefs.surname}
                onChange={handleChange}
                value={formData.surname}
              />
              {errors.surname && (
                <span className="text-red-500 text-sm">{errors.surname}</span>
              )}
            </div>

            {/* Mother's Maiden Name */}
            <div>
              <label
                htmlFor="mothersMaidenName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mother's Maiden Name
              </label>
              <input
                id="mothersMaidenName"
                name="mothersMaidenName"
                className={inputClass}
                ref={inputRefs.mothersMaidenName}
                onChange={handleChange}
                value={formData.mothersMaidenName}
              />
              {errors.mothersMaidenName && (
                <span className="text-red-500 text-sm">
                  {errors.mothersMaidenName}
                </span>
              )}
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className={inputClass}
                ref={inputRefs.gender}
                onChange={handleChange}
                value={formData.gender}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>

              {errors.gender && (
                <span className="text-red-500 text-sm">{errors.gender}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <DatePicker
                id="dateOfBirth"
                placeholderText="Select Date of Birth"
                selected={
                  formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
                }
                ref={inputRefs.dateOfBirth}
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
                  handleChange({
                    target: { name: "dateOfBirth", value: formatted },
                  });
                }}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                className={inputClass}
                maxDate={new Date()}
              />

              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.dateOfBirth)
                    ? errors.dateOfBirth[0]
                    : errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* Marital Status */}
            <div>
              <label
                htmlFor="maritalStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                className={inputClass}
                ref={inputRefs.maritalStatus}
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>

              {errors.maritalStatus && (
                <span className="text-red-500 text-sm">
                  {errors.maritalStatus}
                </span>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nationality
              </label>
              <input
                id="nationality"
                name="nationality"
                className={inputClass}
                ref={inputRefs.nationality}
                value={formData.nationality}
                onChange={handleChange}
              />

              {errors.nationality && (
                <span className="text-red-500 text-sm">
                  {errors.nationality}
                </span>
              )}
            </div>

            {/* State of Origin */}
            <div>
              <label
                htmlFor="stateOfOrigin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State of Origin
              </label>
              <input
                id="stateOfOrigin"
                name="stateOfOrigin"
                className={inputClass}
                onChange={handleChange}
                ref={inputRefs.stateOfOrigin}
                value={formData.stateOfOrigin}
              />

              {errors.stateOfOrigin && (
                <span className="text-red-500 text-sm">
                  {errors.stateOfOrigin}
                </span>
              )}
            </div>

            {/* LGA of Origin */}
            <div>
              <label
                htmlFor="lgaOfOrigin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LGA of Origin
              </label>
              <input
                id="lgaOfOrigin"
                name="lgaOfOrigin"
                className={inputClass}
                ref={inputRefs.lgaOfOrigin}
                onChange={handleChange}
                value={formData.lgaOfOrigin}
              />

              {errors.lgaOfOrigin && (
                <span className="text-red-500 text-sm">
                  {errors.lgaOfOrigin}
                </span>
              )}
            </div>

            <div className="">
              <label
                htmlFor="passportPhoto"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Passport Photo
              </label>
              <input
                id="passportPhoto"
                name="passportPhoto"
                type="file"
                accept="image/*"
                ref={inputRefs.passportPhoto}
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />

              {errors.passportPhoto && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passportPhoto}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="utilityBill"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Utility Bill
              </label>
              <input
                id="utilityBill"
                name="utilityBill"
                type="file"
                accept="image/*,application/pdf"
                ref={inputRefs.utilityBill}
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
              />

              {errors.utilityBill && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.utilityBill}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section>
          <h3 className="text-xl font-semibold mb-4">2. Residential Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* House Number */}
            <div>
              <label
                htmlFor="houseNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                House Number
              </label>
              <input
                id="houseNumber"
                name="houseNumber"
                value={formData.houseNumber}
                className={inputClass}
                ref={inputRefs.houseNumber}
                onChange={handleChange}
              />

              {errors.houseNumber && (
                <span className="text-red-500 text-sm">
                  {errors.houseNumber}
                </span>
              )}
            </div>

            {/* Street Name */}
            <div>
              <label
                htmlFor="streetName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Street Name
              </label>
              <input
                id="streetName"
                name="streetName"
                value={formData.streetName}
                className={inputClass}
                ref={inputRefs.streetName}
                onChange={handleChange}
              />

              {errors.streetName && (
                <span className="text-red-500 text-sm">
                  {errors.streetName}
                </span>
              )}
            </div>

            {/* City/Town */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City/Town
              </label>
              <input
                id="city"
                name="city"
                value={formData.city}
                className={inputClass}
                ref={inputRefs.city}
                onChange={handleChange}
              />

              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>

            {/* Residential LGA */}
            <div>
              <label
                htmlFor="residentialLGA"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Local Government Area (LGA)
              </label>
              <input
                id="residentialLGA"
                name="residentialLGA"
                value={formData.residentialLGA}
                className={inputClass}
                ref={inputRefs.residentialLGA}
                onChange={handleChange}
              />

              {errors.residentialLGA && (
                <span className="text-red-500 text-sm">
                  {errors.residentialLGA}
                </span>
              )}
            </div>

            {/* Residential State */}
            <div>
              <label
                htmlFor="residentialState"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State of Residence
              </label>
              <input
                id="residentialState"
                name="residentialState"
                value={formData.residentialState}
                className={inputClass}
                ref={inputRefs.residentialState}
                onChange={handleChange}
              />

              {errors.residentialState && (
                <span className="text-red-500 text-sm">
                  {errors.residentialState}
                </span>
              )}
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                ref={inputRefs.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.phone) ? errors.phone[0] : errors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                ref={inputRefs.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* EMPLOYMENT */}
        <section>
          <h3 className="text-xl font-semibold mb-4">3. Employment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employment Status */}
            <div>
              <label
                htmlFor="employmentStatus"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employment Status
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                className={inputClass}
                ref={inputRefs.employmentStatus}
                onChange={handleChange}
                value={formData.employmentStatus}
              >
                <option value="">Select Employment Status</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
              </select>
              {errors.employmentStatus && (
                <span className="text-red-500 text-sm">
                  {errors.employmentStatus}
                </span>
              )}
            </div>

            {/* Employer Name */}
            <div>
              <label
                htmlFor="employerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employer Name
              </label>
              <input
                id="employerName"
                name="employerName"
                className={inputClass}
                ref={inputRefs.employerName}
                onChange={handleChange}
                value={formData.employerName}
              />

              {errors.employerName && (
                <span className="text-red-500 text-sm">
                  {errors.employerName}
                </span>
              )}
            </div>

            {/* Employer Address */}
            <div>
              <label
                htmlFor="employerAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employer Address
              </label>
              <input
                id="employerAddress"
                name="employerAddress"
                className={inputClass}
                onChange={handleChange}
                value={formData.employerAddress}
              />

              {errors.employerAddress && (
                <span className="text-red-500 text-sm">
                  {errors.employerAddress}
                </span>
              )}
            </div>

            {/* Annual Income */}
            <div>
              <label
                htmlFor="annualIncome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Annual Income
              </label>
              <select
                id="annualIncome"
                name="annualIncome"
                className={inputClass}
                ref={inputRefs.annualIncome}
                onChange={handleChange}
                value={formData.annualIncome}
              >
                <option value="">Select Annual Income</option>
                <option value="50000">₦0 - ₦50,000</option>
                <option value="250000">₦51,000 - ₦250,000</option>
                <option value="500000">₦251,000 - ₦500,000</option>
                <option value="999999">₦501,000 - ₦999,999</option>
                <option value="4999999">₦1,000,000 - ₦4,999,999</option>
                <option value="9999999">₦5,000,000 - ₦9,999,999</option>
                <option value="19999999">₦10,000,000 - ₦19,999,999</option>
                <option value="20000000">₦20,000,000+</option>
              </select>
              {errors.annualIncome && (
                <span className="text-red-500 text-sm">
                  {errors.annualIncome}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* IDENTIFICATION */}
        <section>
          <h3 className="text-xl font-semibold mb-4">3. Identification</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* ID Type */}
            <div className="w-full md:w-1/2">
              <label
                htmlFor="idType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Type
              </label>
              <select
                id="idType"
                name="idType"
                value={formData.idType}
                ref={inputRefs.idType}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select ID Type</option>
                <option value="national_id">National ID</option>
                <option value="driver_license">Driver's License</option>
                <option value="voter_card">Voter's Card</option>
                <option value="international_passport">
                  International Passport
                </option>
              </select>
              {errors.idType && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.idType)
                    ? errors.idType[0]
                    : errors.idType}
                </p>
              )}
            </div>

            {/* ID Number */}
            <div className="w-full md:w-1/2">
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Number
              </label>
              <input
                id="idNumber"
                name="idNumber"
                type="text"
                value={formData.idNumber}
                ref={inputRefs.idNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.idNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.idNumber)
                    ? errors.idNumber[0]
                    : errors.idNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* ID Issue Date */}
            <div className="w-full md:w-1/3 flex flex-col">
              <label
                htmlFor="idIssueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Issue Date
              </label>
              <DatePicker
                selected={formData.idIssueDate}
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0];
                  handleChange({
                    target: { name: "idIssueDate", value: formatted },
                  });
                }}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select ID Issue Date"
                className={inputClass}
                maxDate={new Date()}
              />
              {errors.idIssueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.idIssueDate)
                    ? errors.idIssueDate[0]
                    : errors.idIssueDate}
                </p>
              )}
            </div>

            {/* ID Expiry Date */}
            <div className="w-full md:w-1/3 flex flex-col">
              <label
                htmlFor="idExpiryDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Expiry Date
              </label>
              <DatePicker
                selected={formData.idExpiryDate}
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0];
                  handleChange({
                    target: { name: "idExpiryDate", value: formatted },
                  });
                }}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select ID Expiry Date"
                className={inputClass}
                minDate={new Date()}
              />
              {errors.idExpiryDate && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.idExpiryDate)
                    ? errors.idExpiryDate[0]
                    : errors.idExpiryDate}
                </p>
              )}
            </div>

            {/* BVN */}
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BVN
              </label>
              <input
                type="text"
                name="bvn"
                value={formData.bvn}
                ref={inputRefs.bvn}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.bvn && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.bvn) ? errors.bvn[0] : errors.bvn}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* NIN */}
            <div className="w-full md:w-1/2">
              <label
                htmlFor="nin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                NIN
              </label>
              <input
                id="nin"
                name="nin"
                type="text"
                value={formData.nin}
                ref={inputRefs.nin}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nin && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.nin) ? errors.nin[0] : errors.nin}
                </p>
              )}
            </div>

            {/* TIN */}
            <div className="w-full md:w-1/2">
              <label
                htmlFor="tin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                TIN
              </label>
              <input
                id="tin"
                name="tin"
                type="text"
                value={formData.tin}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.tin && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.tin) ? errors.tin[0] : errors.tin}
                </p>
              )}
            </div>
          </div>

          {/* Upload Means of ID */}
          <div className="mb-4">
            <label
              htmlFor="uploadedIdFile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Uploaded ID
            </label>
            <input
              id="uploadedIdFile"
              name="uploadedIdFile"
              type="file"
              accept="image/*,application/pdf"
              ref={inputRefs.uploadedIdFile}
              onChange={(e) => {
                handleFileChange(e);
              }}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />

            {errors.uploadedIdFile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.uploadedIdFile}
              </p>
            )}
          </div>
        </section>

        {/* NEXT OF KIN */}
        <section>
          <h3 className="text-xl font-semibold mb-4">4. Next of Kin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="nokFirstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="nokFirstName"
                name="nokFirstName"
                value={formData.nokFirstName}
                className={inputClass}
                ref={inputRefs.nokFirstName}
                onChange={handleChange}
              />
              {errors.nokFirstName && (
                <span className="text-red-500 text-sm">
                  {errors.nokFirstName}
                </span>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <label
                htmlFor="nokMiddleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle Name
              </label>
              <input
                id="nokMiddleName"
                name="nokMiddleName"
                value={formData.nokMiddleName}
                className={inputClass}
                onChange={handleChange}
              />
            </div>

            {/* Surname */}
            <div>
              <label
                htmlFor="nokSurname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Surname
              </label>
              <input
                id="nokSurname"
                name="nokSurname"
                value={formData.nokSurname}
                className={inputClass}
                ref={inputRefs.nokSurname}
                onChange={handleChange}
              />
              {errors.nokSurname && (
                <span className="text-red-500 text-sm">
                  {errors.nokSurname}
                </span>
              )}
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="nokGender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="nokGender"
                name="nokGender"
                value={formData.nokGender}
                className={inputClass}
                ref={inputRefs.nokGender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              {errors.nokGender && (
                <span className="text-red-500 text-sm">{errors.nokGender}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label
                htmlFor="nokDOB"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Next of Kin Date of Birth
              </label>
              <DatePicker
                id="nokDOB"
                placeholderText="Select NOK Date of Birth"
                selected={formData.nokDOB}
                ref={inputRefs.nokDOB}
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
                  handleChange({
                    target: { name: "nokDOB", value: formatted },
                  });
                }}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                className={inputClass}
                maxDate={new Date()}
              />
              {errors.nokDOB && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.nokDOB}
                </span>
              )}
            </div>

            {/* Relationship */}
            <div>
              <label
                htmlFor="nokRelationship"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Relationship
              </label>
              <input
                id="nokRelationship"
                name="nokRelationship"
                value={formData.nokRelationship}
                className={inputClass}
                onChange={handleChange}
              />
              {errors.nokRelationship && (
                <span className="text-red-500 text-sm">
                  {errors.nokRelationship}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="nokPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="nokPhone"
                name="nokPhone"
                type="tel"
                value={formData.nokPhone}
                ref={inputRefs.nokPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nokPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.nokPhone)
                    ? errors.nokPhone[0]
                    : errors.nokPhone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="nokEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="nokEmail"
                name="nokEmail"
                type="email"
                value={formData.nokEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.nokEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.nokEmail)
                    ? errors.nokEmail[0]
                    : errors.nokEmail}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label
                htmlFor="nokAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="nokAddress"
                name="nokAddress"
                value={formData.nokAddress}
                className={inputClass}
                ref={inputRefs.nokAddress}
                onChange={handleChange}
              />
              {errors.nokAddress && (
                <span className="text-red-500 text-sm">
                  {errors.nokAddress}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ACCOUNT PREFERENCES */}
        <section>
          <h3 className="text-xl font-semibold mb-4">5. Account Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Type */}
            <div>
              <label
                htmlFor="accountType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                className={inputClass}
                ref={inputRefs.accountType}
                onChange={handleChange}
                value={formData.accountType}
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="domiciliary">Business</option>
                <option value="student">Student</option>
              </select>
              {errors.accountType && (
                <span className="text-red-500 text-sm">
                  {errors.accountType}
                </span>
              )}
            </div>

            {/* Card Type */}
            <div>
              <label
                htmlFor="cardType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Card Type
              </label>
              <select
                id="cardType"
                name="cardType"
                className={inputClass}
                onChange={handleChange}
                value={formData.cardType}
              >
                <option value="">Select Card Type</option>
                <option value="mastercard">MasterCard</option>
                <option value="verve">Verve</option>
                <option value="visa">VISA</option>
              </select>
              {errors.cardType && (
                <span className="text-red-500 text-sm">{errors.cardType}</span>
              )}
            </div>

            {/* Electronic Banking Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Electronic Banking Options
              </label>
              <div className="flex flex-col gap-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="electronicBanking"
                    value="online"
                    onChange={handleChange}
                    checked={formData.electronicBanking.includes("online")}
                  />
                  Online Banking
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="electronicBanking"
                    value="mobile"
                    onChange={handleChange}
                    checked={formData.electronicBanking.includes("mobile")}
                  />
                  Mobile Banking
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="electronicBanking"
                    value="wallet"
                    onChange={handleChange}
                    checked={formData.electronicBanking.includes("wallet")}
                  />
                  Mobile Wallet
                </label>
                {errors.electronicBanking && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.electronicBanking}
                  </p>
                )}
              </div>
            </div>

            {/* Alert Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Preferences
              </label>
              <div className="flex flex-col gap-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="alertPreference"
                    value="email"
                    onChange={handleChange}
                    checked={formData.alertPreference.includes("email")}
                  />
                  Email Alerts
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="alertPreference"
                    value="sms"
                    onChange={handleChange}
                    checked={formData.alertPreference.includes("sms")}
                  />
                  SMS Alerts
                </label>
                {errors.alertPreference && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.alertPreference}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MANDATE */}
        <section>
          <h3 className="text-xl font-semibold mb-4">6. Account Mandate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mandate First Name */}
            <div>
              <label
                htmlFor="mandateFirstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="mandateFirstName"
                name="mandateFirstName"
                className={inputClass}
                ref={inputRefs.mandateFirstName}
                onChange={handleChange}
                value={formData.mandateFirstName}
              />
              {errors.mandateFirstName && (
                <span className="text-red-500 text-sm">
                  {errors.mandateFirstName}
                </span>
              )}
            </div>

            {/* Mandate Middle Name */}
            <div>
              <label
                htmlFor="mandateMiddleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle Name
              </label>
              <input
                id="mandateMiddleName"
                name="mandateMiddleName"
                className={inputClass}
                onChange={handleChange}
                value={formData.mandateMiddleName}
              />
            </div>

            {/* Mandate Surname */}
            <div>
              <label
                htmlFor="mandateSurname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Surname
              </label>
              <input
                id="mandateSurname"
                name="mandateSurname"
                className={inputClass}
                ref={inputRefs.mandateSurName}
                onChange={handleChange}
                value={formData.mandateSurname}
              />
              {errors.mandateSurname && (
                <span className="text-red-500 text-sm">
                  {errors.mandateSurname}
                </span>
              )}
            </div>

            {/* ID Type */}
            <div>
              <label
                htmlFor="mandateIdType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Type
              </label>
              <select
                id="mandateIdType"
                name="mandateIdType"
                value={formData.mandateIdType}
                ref={inputRefs.mandateIdType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select ID Type</option>
                <option value="national_id">National ID</option>
                <option value="driver_license">Driver's License</option>
                <option value="voter_card">Voter's Card</option>
                <option value="international_passport">
                  International Passport
                </option>
              </select>

              {errors.mandateIdType && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.mandateIdType)
                    ? errors.mandateIdType[0]
                    : errors.mandateIdType}
                </p>
              )}
            </div>

            {/* ID Number */}
            <div>
              <label
                htmlFor="mandateIdNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Number
              </label>
              <input
                id="mandateIdNumber"
                name="mandateIdNumber"
                type="text"
                value={formData.mandateIdNumber}
                ref={inputRefs.mandateIdNumber}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.mandateIdNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.mandateIdNumber)
                    ? errors.mandateIdNumber[0]
                    : errors.mandateIdNumber}
                </p>
              )}
            </div>

            {/* Mandate Phone */}
            <div>
              <label
                htmlFor="mandatePhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="mandatePhone"
                name="mandatePhone"
                type="tel"
                value={formData.mandatePhone}
                ref={inputRefs.mandatePhone}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.mandatePhone && (
                <p className="text-red-500 text-sm mt-1">
                  {Array.isArray(errors.mandatePhone)
                    ? errors.mandatePhone[0]
                    : errors.mandatePhone}
                </p>
              )}
            </div>

            {/* Mandate Date */}
            <div className="flex flex-col">
              <label
                htmlFor="mandateDate"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Mandate Date
              </label>
              <DatePicker
                selected={
                  formData.mandateDate ? new Date(formData.mandateDate) : null
                }
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0];
                  handleChange({
                    target: { name: "mandateDate", value: formatted },
                  });
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Mandate Date"
                className={inputClass}
                maxDate={new Date()}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
              {errors.mandateDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.mandateDate}
                </span>
              )}
            </div>

            {/* Digital Signature Upload */}
            <div>
              <label
                htmlFor="mandateSignature"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Digital Signature
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                id="mandateSignature"
                name="mandateSignature"
                accept=".jpg,.jpeg,.png,.pdf"
                ref={inputRefs.mandateSignature}
                onChange={handleChange}
              />

              {errors.mandateSignature && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mandateSignature}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* DECLARATION */}
        <section>
          <h3 className="text-xl font-semibold mb-4">7. Declaration</h3>

          <p className="mb-4">
            I/We hereby apply for the opening of account(s) with{" "}
            <b>Urban Revolution Bank (URBank)</b>. I/We understand that the
            information given herein and the documents supplied are the basis
            for opening such account(s) and I/We therefore warrant that such
            information is correct. I/We further undertake to indemnify the Bank
            for any loss suffered as a result of any false information or error
            in the information provided by the Bank.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Declaration Name */}
            <div>
              <label
                htmlFor="declarationName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                id="declarationName"
                name="declarationName"
                className={inputClass}
                ref={inputRefs.declarationName}
                onChange={handleChange}
                value={formData.declarationName}
              />
              {errors.declarationName && (
                <span className="text-red-500 text-sm">
                  {errors.declarationName}
                </span>
              )}
            </div>

            {/* Declaration Date */}
            <div className="flex flex-col">
              <label
                htmlFor="declarationDate"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Declaration Date
              </label>
              <DatePicker
                selected={
                  formData.declarationDate
                    ? new Date(formData.declarationDate)
                    : null
                }
                onChange={(date) => {
                  const formatted = date.toISOString().split("T")[0];
                  handleChange({
                    target: { name: "declarationDate", value: formatted },
                  });
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Declaration Date"
                className={inputClass}
                maxDate={new Date()}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
              {errors.declarationDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.declarationDate}
                </span>
              )}
            </div>

            {/* Upload Signature */}
            <div className="md:col-span-2">
              <label
                htmlFor="declarationSignature"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Digital Signature
              </label>
              <input
                type="file"
                id="declarationSignature"
                name="declarationSignature"
                accept=".jpg,.jpeg,.png,.pdf"
                ref={inputRefs.declarationSignature}
                onChange={handleFileChange}
                className="w-1/2 border border-gray-300 px-3 py-2 rounded-md"
              />

              {errors.declarationSignature && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.declarationSignature}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-64 py-3 rounded-md font-semibold shadow-md text-white text-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-400 hover:bg-sky-300"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Form"}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-64 py-2 rounded-md font-semibold bg-slate-800 text-white hover:bg-slate-700 shadow-md"
          >
            Print Copy
          </button>
        </div>
      </form>
    </>
  );
}
