-- ==============================================================================
-- Bahauddin Zakariya University (BZU), Multan — Production Database Schema
-- Compatible with PostgreSQL 14+ / MySQL 8+ / Cloud SQL / AWS RDS
-- ==============================================================================

-- 1. FACULTIES TABLE
CREATE TABLE IF NOT EXISTS faculties (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(32) NOT NULL UNIQUE,
    dean VARCHAR(255) NOT NULL,
    departments_count INT DEFAULT 0,
    programs_count INT DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ACADEMIC DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    faculty_id VARCHAR(64) NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    faculty_name VARCHAR(255) NOT NULL,
    head_of_department VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. DEGREE PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS programs (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(64) NOT NULL, -- 'Undergraduate', 'Lateral BS (5th Sem)', 'MS / M.Phil', 'Doctoral (PhD)', 'Associate Degree (ADP)', 'Diploma'
    faculty_id VARCHAR(64) NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    faculty_name VARCHAR(255) NOT NULL,
    department_id VARCHAR(64) NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    department_name VARCHAR(255) NOT NULL,
    duration VARCHAR(64) NOT NULL,
    credit_hours INT NOT NULL,
    eligibility TEXT NOT NULL,
    annual_fee_pkr NUMERIC(12, 2) NOT NULL,
    shifts TEXT[] DEFAULT ARRAY['Morning'],
    description TEXT,
    career_prospects TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. FACULTY MEMBERS TABLE (600 Census)
CREATE TABLE IF NOT EXISTS faculty_members (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(64) NOT NULL, -- 'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'
    qualification VARCHAR(255) NOT NULL,
    degree_holder_phd BOOLEAN DEFAULT FALSE,
    department_name VARCHAR(255) NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    gender VARCHAR(16) NOT NULL,
    research_interests TEXT[],
    email VARCHAR(255) UNIQUE NOT NULL,
    office_room VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ADMISSION APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS admission_applications (
    id VARCHAR(64) PRIMARY KEY,
    app_tracking_no VARCHAR(64) UNIQUE NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    cnic VARCHAR(32) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    gender VARCHAR(16) NOT NULL,
    dob DATE NOT NULL,
    domicile VARCHAR(128) NOT NULL,
    matric_roll_no VARCHAR(64),
    matric_marks NUMERIC(8, 2) NOT NULL,
    matric_total NUMERIC(8, 2) NOT NULL,
    inter_roll_no VARCHAR(64),
    inter_marks NUMERIC(8, 2) NOT NULL,
    inter_total NUMERIC(8, 2) NOT NULL,
    entry_test_score NUMERIC(8, 2),
    first_choice_program VARCHAR(255) NOT NULL,
    second_choice_program VARCHAR(255),
    shift VARCHAR(32) DEFAULT 'Morning',
    quota VARCHAR(64) DEFAULT 'Open Merit',
    calculated_aggregate NUMERIC(5, 2) NOT NULL,
    status VARCHAR(64) DEFAULT 'Under Review',
    challan_number VARCHAR(64) NOT NULL,
    challan_amount NUMERIC(8, 2) DEFAULT 1500,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. MERIT LISTS TABLE
CREATE TABLE IF NOT EXISTS merit_lists (
    id VARCHAR(64) PRIMARY KEY,
    program_title VARCHAR(255) NOT NULL,
    list_type VARCHAR(64) NOT NULL, -- '1st Merit List', '2nd Merit List', '3rd Merit List'
    session VARCHAR(32) NOT NULL,
    shift VARCHAR(32) NOT NULL,
    quota VARCHAR(64) NOT NULL,
    closing_aggregate NUMERIC(5, 2) NOT NULL,
    publication_date DATE NOT NULL,
    fee_deadline DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. EXAM RESULTS & TRANSCRIPTS TABLE
CREATE TABLE IF NOT EXISTS exam_results (
    roll_number VARCHAR(64) PRIMARY KEY,
    reg_number VARCHAR(64) UNIQUE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    program VARCHAR(255) NOT NULL,
    semester VARCHAR(64) NOT NULL,
    session VARCHAR(32) NOT NULL,
    exam_type VARCHAR(64) NOT NULL,
    gpa NUMERIC(4, 2) NOT NULL,
    cgpa NUMERIC(4, 2) NOT NULL,
    status VARCHAR(32) NOT NULL,
    declaration_date VARCHAR(64) NOT NULL,
    subjects_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. NEWS BULLETINS & VACANCIES TABLE
CREATE TABLE IF NOT EXISTS news_bulletins (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    category VARCHAR(64) NOT NULL,
    publish_date VARCHAR(64) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    is_important BOOLEAN DEFAULT FALSE,
    attachment_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CONTACT GRIEVANCE INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id VARCHAR(64) PRIMARY KEY,
    ticket_number VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    department_target VARCHAR(128) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'Received',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS subscribers (
    email VARCHAR(255) PRIMARY KEY,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CREATE ESSENTIAL SEARCH INDEXES
CREATE INDEX IF NOT EXISTS idx_programs_level ON programs(level);
CREATE INDEX IF NOT EXISTS idx_programs_faculty ON programs(faculty_id);
CREATE INDEX IF NOT EXISTS idx_applications_cnic ON admission_applications(cnic);
CREATE INDEX IF NOT EXISTS idx_applications_tracking ON admission_applications(app_tracking_no);
CREATE INDEX IF NOT EXISTS idx_results_reg ON exam_results(reg_number);
