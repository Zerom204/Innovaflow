// ================= DATA STORES & STATE =================
const DOCKET_DB = [
  {
    id: "DKT-2023-451A",
    active: true,
    name: "TechCorp Holdings LLC vs. State Department of Revenue",
    pinned: true,
    years: ["FY 2021-22", "FY 2022-23"],
    path: "file:///Z:/Legal/Litigation/2023/TechCorp_vs_State/Main_Docket",
    size: "1.2 GB",
    modDate: "Oct 24, 2023",
    employee: "J. Smith",
    tree: [
      { type: "folder", name: "TechCorp_vs_State", indent: 0 },
      { type: "folder", name: "pleadings", indent: 1 },
      { type: "file", name: "DKT-2023-451A_Complaint.pdf", indent: 2 },
      { type: "file", name: "DKT-2023-451A_Answer.pdf", indent: 2 },
      { type: "folder", name: "discovery", indent: 1 },
      { type: "file", name: "Interrogatories_State_v1.xlsx", indent: 2 },
      { type: "file", name: "Document_Production_Index.xlsx", indent: 2 },
      { type: "folder", name: "exhibits", indent: 1 },
      { type: "file", name: "EX_A_Tax_Filing_2022.pdf", indent: 2 },
      { type: "file", name: "EX_B_Internal_Ledger.xlsx", indent: 2 }
    ]
  },
  {
    id: "DKT-2023-0892",
    active: true,
    name: "Alpha Corp M&A Ingestion & Asset Allocation",
    pinned: true,
    years: ["FY 2022-23"],
    path: "file:///Z:/Legal/Corporate/M_A/Alpha_Corp/Docket_Index",
    size: "450 MB",
    modDate: "Oct 23, 2023",
    employee: "A. Carter",
    tree: [
      { type: "folder", name: "Alpha_Corp", indent: 0 },
      { type: "folder", name: "contracts", indent: 1 },
      { type: "file", name: "Asset_Purchase_Agreement_FINAL.pdf", indent: 2 },
      { type: "file", name: "Disclosure_Schedules.pdf", indent: 2 },
      { type: "folder", name: "due_diligence", indent: 1 },
      { type: "file", name: "Employee_Roster_Audit.xlsx", indent: 2 }
    ]
  },
  {
    id: "DKT-2021-1104",
    active: true,
    name: "State vs. Beta LLC Civil Action & Regulatory Scan",
    pinned: true,
    years: ["FY 2020-21", "FY 2021-22"],
    path: "file:///Z:/Legal/Litigation/2021/State_vs_Beta/Case_Records",
    size: "2.4 GB",
    modDate: "Oct 15, 2023",
    employee: "J. Smith",
    tree: [
      { type: "folder", name: "State_vs_Beta", indent: 0 },
      { type: "folder", name: "court_filings", indent: 1 },
      { type: "file", name: "DKT-2021-1104_Summons.pdf", indent: 2 },
      { type: "file", name: "Scheduling_Order.pdf", indent: 2 },
      { type: "folder", name: "transcripts", indent: 1 },
      { type: "file", name: "Deposition_John_Doe_10-12-21.pdf", indent: 2 }
    ]
  },
  {
    id: "DKT-2024-0012",
    active: false,
    name: "Q3 Financial Audits Consolidated Docket",
    pinned: false,
    years: ["FY 2023-24"],
    path: "file:///Z:/Legal/Audits/2024/Q3_Financial_Audits/Master",
    size: "820 MB",
    modDate: "Nov 02, 2023",
    employee: "M. Ramirez",
    tree: [
      { type: "folder", name: "Q3_Financial_Audits", indent: 0 },
      { type: "file", name: "Audit_Plan_Q3_v1.docx", indent: 1 },
      { type: "file", name: "Consolidated_Ledger_Pre_Audit.xlsx", indent: 1 },
      { type: "folder", name: "reconciliations", indent: 1 },
      { type: "file", name: "Intercompany_Balances_Reconciled.xlsx", indent: 2 }
    ]
  },
  {
    id: "DKT-2023-0901",
    active: true,
    name: "In Re: Omega Corp Bankruptcy Docket Records",
    pinned: false,
    years: ["FY 2022-23", "FY 2023-24"],
    path: "file:///Z:/Legal/Bankruptcy/2023/Omega_Corp/Bankruptcy_Filings",
    size: "3.1 GB",
    modDate: "Sep 30, 2023",
    employee: "H. Vance",
    tree: [
      { type: "folder", name: "Omega_Corp", indent: 0 },
      { type: "folder", name: "petitions", indent: 1 },
      { type: "file", name: "Chapter_11_Petition_Omega.pdf", indent: 2 },
      { type: "folder", name: "creditors", indent: 1 },
      { type: "file", name: "Top_20_Unsecured_Creditors.xlsx", indent: 2 }
    ]
  }
];

const LOG_MESSAGES_TEMPLATE = [
  { text: "Initializing InnovaFlow organizer engine...", type: "info", docket: "", error: "" },
  { text: "✓ Ingest worker pool spawned: {threads} threads active.", type: "success", docket: "", error: "" },
  { text: "Scanning raw data directories: {source}...", type: "info", docket: "", error: "" },
  { text: "✓ Scanning complete. Located 1,450 files across {folders} folders.", type: "success", docket: "", error: "" },
  { text: "Matching folder index definitions against master index database...", type: "info", docket: "", error: "" },
  { text: "✓ Folder matched: AX-204 → Project Beta ({year})", type: "success", docket: "DKT-2023-451A", error: "" },
  { text: "✓ File routed: 'Invoice_102.pdf' → /Billing/{year}/Invoice_102.pdf", type: "success", docket: "DKT-2024-0012", error: "" },
  { text: "⚠ Duplicate detected: 'Contract_v1.docx'. System flagged: /clients/beta/Contract_v1.docx", type: "warning", docket: "DKT-2023-0892", error: "" },
  { text: "✓ Created record revision for 'Q4_Report.xlsx' (v1.2 → v1.3)", type: "success", docket: "DKT-2021-1104", error: "" },
  { text: "Scanning clean output destination: {dest}...", type: "info", docket: "", error: "" },
  { text: "✗ Error: Permission denied on Destination path /Project_Gamma/Secured/", type: "error", docket: "DKT-2023-0901", error: "Permission" },
  { text: "Attempting to resolve corrupt folder names: 'Data_??X12' ...", type: "info", docket: "", error: "" },
  { text: "✓ Autocorrected encoding on: 'Scan_O_Meara_{year}.pdf'", type: "success", docket: "DKT-2023-451A", error: "" },
  { text: "✗ Error: Corrupt zip header detected in 'Archive_FY_Legacy.zip'", type: "error", docket: "DKT-2021-1104", error: "Corrupt" },
  { text: "Syncing metadata transactions to master database...", type: "info", docket: "", error: "" },
  { text: "Committing file operations to storage...", type: "info", docket: "", error: "" }
];

let appState = {
  currentView: "landing",
  searchQuery: "",
  searchFilter: "All",
  activeTreeDockets: {},
  logsRunning: false,
  logInterval: null,
  logIndex: 0,
  toastTimeout: null,
  darkModeActive: false,

  // Dynamic Years & Lists
  SYSTEM_YEARS: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"],
  selectedExplorerYear: null,
  selectedDashboardYear: "2023-24",
  pinnedYears: ["2023-24", "2022-23"],
  recentSearches: ["TechCorp vs State", "Q3 Financial Audits", "2023-24"],
  recentReports: [],
  liveLogs: [], // Stores logged entries for active run

  // Added integration properties
  threshold: 50,
  port: "8001",
  dashboardExcel: "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\excel.xlsx",
  dashboardSource: "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Raw_Data",
  dashboardDest: "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output",
  dashboardReportsDir: "C:\\Users\\INNOVUS\\Desktop\\TEST\\reports",
  processedTransactions: [],
};

function getApiBaseUrl() {
  const host = window.location.hostname || "localhost";
  const port = window.location.port || appState.port || "8001";
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";
  return `${protocol}//${host}:${port}`;
}

function getWsBaseUrl() {
  const host = window.location.hostname || "localhost";
  const port = window.location.port || appState.port || "8001";
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${host}:${port}`;
}

// Load state from localStorage or sessionStorage
let hasSavedTheme = false;
const savedStateRaw = localStorage.getItem("innovaFlow_state") || sessionStorage.getItem("innovaFlow_state");
if (savedStateRaw) {
  try {
    const saved = JSON.parse(savedStateRaw);
    Object.assign(appState, saved);
    appState.logsRunning = false;
    appState.logInterval = null;
    if (saved.hasOwnProperty("darkModeActive")) {
      hasSavedTheme = true;
    }
    if (!appState.dashboardReportsDir || appState.dashboardReportsDir.includes("sneha")) {
      appState.dashboardReportsDir = "C:\\Users\\INNOVUS\\Desktop\\TEST\\reports";
    }
  } catch (e) {
    console.error("Failed to restore state", e);
  }
}

// If theme preference isn't explicitly saved yet, default to system preference
if (!hasSavedTheme) {
  appState.darkModeActive = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// Apply dark mode immediately to avoid layout flash
if (appState.darkModeActive) {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

// Watch for system color scheme changes in real-time
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!sessionStorage.getItem("theme_overridden")) {
      appState.darkModeActive = event.matches;
      if (appState.darkModeActive) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      saveState();
    }
  });
}

function saveState() {
  try {
    localStorage.setItem("innovaFlow_state", JSON.stringify(appState));
  } catch (e) { }
  try {
    sessionStorage.setItem("innovaFlow_state", JSON.stringify(appState));
  } catch (e) { }
  if (window._persistReportsTimeout) clearTimeout(window._persistReportsTimeout);
  window._persistReportsTimeout = setTimeout(() => {
    if (typeof persistReportsToDisk === "function") {
      persistReportsToDisk();
    }
  }, 400);
}

function getReportsDirectory() {
  if (appState.dashboardReportsDir && !appState.dashboardReportsDir.includes("sneha")) {
    return appState.dashboardReportsDir;
  }
  return "C:\\Users\\INNOVUS\\Desktop\\TEST\\reports";
}

function updateReportsPathUI() {
  const currentPath = getReportsDirectory();
  appState.dashboardReportsDir = currentPath;
  const pathDisplay = document.getElementById("reports-path-display");
  if (pathDisplay) {
    pathDisplay.innerText = currentPath;
  }
}

function fetchReportsFromDisk() {
  const port = appState.port || "8001";
  const dirPath = getReportsDirectory();
  fetch(`http://localhost:${port}/api/reports?reports_dir=${encodeURIComponent(dirPath)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === "success") {
        if (data.reports_dir) {
          appState.dashboardReportsDir = data.reports_dir;
        }
        if (Array.isArray(data.reports) && data.reports.length > 0) {
          appState.iterationReports = data.reports;
          if (!appState.activeReportId && appState.iterationReports.length > 0) {
            appState.activeReportId = appState.iterationReports[0].id;
          }
        }
        updateReportsPathUI();
        updateReportsHistoryDropdown();
        if (typeof renderReportsTable === "function") renderReportsTable();
        if (typeof initReportsSubmenu === "function") initReportsSubmenu();
      }
    })
    .catch(err => {
      console.log("Could not load reports from disk yet:", err);
    });
}

function persistReportsToDisk() {
  const port = appState.port || "8001";
  const dirPath = getReportsDirectory();
  if (!appState.iterationReports) appState.iterationReports = [];

  fetch(`http://localhost:${port}/api/reports/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reports_dir: dirPath,
      reports: appState.iterationReports
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data && data.status === "success") {
      if (data.reports_dir) {
        appState.dashboardReportsDir = data.reports_dir;
      }
      updateReportsPathUI();
    }
  })
  .catch(err => {
    console.error("Error persisting reports to disk:", err);
  });
}

function promptChangeReportsPath() {
  const currentPath = getReportsDirectory();
  const newPath = prompt("Enter local path to store Reports:", currentPath);
  if (newPath && newPath.trim() !== "") {
    appState.dashboardReportsDir = newPath.trim();
    updateReportsPathUI();
    fetchReportsFromDisk();
    persistReportsToDisk();
    triggerToast("Reports storage path updated.");
  }
}

function selectHistoricalReport(reportId) {
  if (!reportId) return;
  appState.activeReportId = reportId;
  saveState();
  if (typeof renderReportsTable === "function") renderReportsTable();
  if (typeof initReportsSubmenu === "function") initReportsSubmenu();
}

function updateReportsHistoryDropdown() {
  const selectElem = document.getElementById("reports-history-select");
  if (!selectElem) return;
  selectElem.innerHTML = "";
  if (!appState.iterationReports || appState.iterationReports.length === 0) {
    selectElem.innerHTML = `<option value="">No Saved Reports</option>`;
    return;
  }
  appState.iterationReports.forEach(rep => {
    const isSelected = rep.id === appState.activeReportId;
    const timeStr = rep.timestamp || "";
    selectElem.innerHTML += `<option value="${rep.id}" ${isSelected ? 'selected' : ''}>${rep.id} (FY ${rep.targetYear}) - ${timeStr}</option>`;
  });
}

function syncYearsFromBackend() {
  const port = appState.port || "8001";
  const destDir = appState.dashboardDest || "";
  fetch(`http://localhost:${port}/api/years?dest_dir=${encodeURIComponent(destDir)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.years && Array.isArray(data.years)) {
        let changed = false;
        data.years.forEach(y => {
          if (!appState.SYSTEM_YEARS.includes(y)) {
            appState.SYSTEM_YEARS.push(y);
            changed = true;
          }
        });
        if (changed) {
          appState.SYSTEM_YEARS.sort();
          saveState();
          if (document.getElementById("dashboard-year-tags")) renderDashboardYears();
          if (document.getElementById("explorer-years-list")) renderExplorerYears();
          if (document.getElementById("chart-files-processed")) renderAnalytics();
        }
      }
    })
    .catch(err => {
      console.log("Could not sync years from backend yet:", err);
    });
}

function getReportName(rep, index) {
  let timeStr = "";
  if (rep.timestamp) {
    const parts = rep.timestamp.split(" ");
    if (parts.length >= 2) {
      const datePart = parts[0]; // "2026-08-13"
      const timePart = parts[1]; // "14:57:39"
      
      const dateSubparts = datePart.split("-");
      if (dateSubparts.length === 3) {
        const month = parseInt(dateSubparts[1], 10) - 1;
        const day = parseInt(dateSubparts[2], 10);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (month >= 0 && month < 12) {
          timeStr = ` (${monthNames[month]} ${day}, ${timePart})`;
        }
      }
    }
  }
  return `Run #${index + 1}${timeStr}`;
}

function seedIterationReports() {
  // Migrate legacy macOS paths to Windows sandbox
  if (appState.dashboardExcel && appState.dashboardExcel.includes("/Volumes")) {
    appState.dashboardExcel = "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\excel.xlsx";
    appState.dashboardSource = "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Raw_Data";
    appState.dashboardDest = "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
    saveState();
  }

  // Initialize iterationReports array if missing (no dummy data)
  if (!appState.iterationReports) {
    appState.iterationReports = [];
  }

  // Purge any legacy dummy reports still cached in sessionStorage
  const dummyTimestamps = ["2026-07-10 14:15:02", "2026-07-10 11:02:44"];
  appState.iterationReports = appState.iterationReports.filter(
    rep => !dummyTimestamps.includes(rep.timestamp)
  );

  // Re-number all reports sequentially: newest = Run #1, oldest = Run #N
  appState.iterationReports.forEach((rep, index) => {
    rep.id = getReportName(rep, index);
    if (!rep.bufferedTransactions) rep.bufferedTransactions = [];
  });
  if (appState.iterationReports.length > 0) {
    appState.activeReportId = appState.iterationReports[0].id;
    appState.recentReports = appState.iterationReports.map(r => r.id);
  }
  saveState();
}
seedIterationReports();

function initReportsSubmenu() {
  const reportsNavItem = document.querySelector(".nav-item[onclick*='reports']");
  if (!reportsNavItem) return;

  // Remove existing submenu if any
  const existing = document.getElementById("reports-nav-submenu");
  if (existing) existing.remove();

  // Create submenu element
  const submenu = document.createElement("div");
  submenu.id = "reports-nav-submenu";
  submenu.className = "nav-submenu";

  // Only show if we have reports
  if (appState.iterationReports && appState.iterationReports.length > 0) {
    // Show only the last 5 runs
    const lastFive = appState.iterationReports.slice(0, 5);

    lastFive.forEach(rep => {
      const subItem = document.createElement("div");
      const isActive = rep.id === appState.activeReportId;
      subItem.className = `submenu-item${isActive ? " active" : ""}`;
      subItem.innerHTML = `<span>${rep.id}</span><span style="font-size: 8px; opacity: 0.6;">FY ${rep.targetYear}</span>`;
      subItem.onclick = (e) => {
        e.stopPropagation();
        if (window.location.pathname.endsWith("reports.html")) {
          selectReport(rep.id);
        } else {
          appState.activeReportId = rep.id;
          saveState();
          window.location.href = "reports.html";
        }
      };
      submenu.appendChild(subItem);
    });
  }

  // Insert after the reports nav item
  reportsNavItem.after(submenu);

  // If reports is the active view, expand the submenu by default
  if (appState.currentView === "reports") {
    submenu.classList.add("expanded");
  }

  // Override click behavior of reportsNavItem to toggle if already on reports page
  reportsNavItem.onclick = (e) => {
    if (window.location.pathname.endsWith("reports.html")) {
      e.preventDefault();
      e.stopPropagation();
      submenu.classList.toggle("expanded");
    } else {
      switchTab('reports', reportsNavItem);
    }
  };
}

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  // Determine currentView from current pathname
  const path = window.location.pathname;
  if (path.endsWith("dashboard.html")) appState.currentView = "dashboard";
  else if (path.endsWith("explorer.html")) appState.currentView = "finder";
  else if (path.endsWith("logs.html")) appState.currentView = "logs";
  else if (path.endsWith("reports.html")) appState.currentView = "reports";
  else if (path.endsWith("analytics.html")) appState.currentView = "analytics";
  else if (path.endsWith("settings.html")) appState.currentView = "settings";
  else appState.currentView = "landing";

  saveState();

  // Update sidebar active classes
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    const onclickAttr = item.getAttribute("onclick");
    if (onclickAttr && onclickAttr.includes(`'${appState.currentView === "finder" ? "finder" : appState.currentView}'`)) {
      item.classList.add("active");
    }
  });

  // Render relevant view lists if elements exist
  const workspaceContainer = document.getElementById("workspace-container");
  if (workspaceContainer) {
    workspaceContainer.style.display = "block";
  }

  // Update settings input values if we are on the settings page
  if (appState.currentView === "settings") {
    const thresholdInput = document.getElementById("setting-threshold");
    const thresholdNumberInput = document.getElementById("setting-threshold-number");
    if (thresholdInput) {
      const val = appState.threshold || 50;
      thresholdInput.value = val;
      if (thresholdNumberInput) thresholdNumberInput.value = val;
      const confidenceVal = document.getElementById("confidence-val");
      if (confidenceVal) confidenceVal.innerText = val + "%";
    }
    const portInput = document.getElementById("setting-port");
    if (portInput) {
      portInput.value = appState.port || "8000";
    }
  }

  // Update dashboard input values if we are on the dashboard page
  if (appState.currentView === "dashboard") {
    const excelInput = document.getElementById("input-master-excel");
    if (excelInput) excelInput.value = appState.dashboardExcel || "/Volumes/Data/Master_Index.xlsx";
    const sourceInput = document.getElementById("input-source-dirs");
    if (sourceInput) sourceInput.value = appState.dashboardSource || "/Volumes/Data/Raw_Inputs, /Volumes/Data/Scans";
    const destInput = document.getElementById("input-dest-path");
    if (destInput) {
      destInput.value = appState.dashboardDest || "/Volumes/Data/Organized_Output";
      destInput.addEventListener("change", () => {
        appState.dashboardDest = destInput.value.trim();
        saveState();
        fetchSystemCapacity(appState.dashboardDest);
      });
      destInput.addEventListener("blur", () => {
        appState.dashboardDest = destInput.value.trim();
        saveState();
        fetchSystemCapacity(appState.dashboardDest);
      });
    }
  }

  if (document.getElementById("capacity-value")) {
    fetchSystemCapacity(appState.dashboardDest);
  }

  if (document.getElementById("dashboard-year-tags")) renderDashboardYears();
  if (document.getElementById("explorer-years-list")) {
    renderExplorerYears();
    renderPinnedYears();
    renderRecentSearches();
    renderRecentReports();
    updateExplorerView();
  }
  if (document.getElementById("log-filter-year")) {
    setupLogFiltersYearOptions();
    applyLogFilters();
  }
  if (document.getElementById("chart-files-processed")) {
    renderAnalytics();
  }
  if (document.getElementById("reports-empty-state")) {
    updateReportsView();
    renderReportsTable();
  }

  syncYearsFromBackend();

  // Setup keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openGlobalSearch();
    } else if (e.key === "Escape") {
      closeGlobalSearch();
      closeAddYearModal();
    }
  });

  initReportsSubmenu();
});

// ================= TRANSITIONS & ROUTING =================
function enterWorkspace() {
  appState.currentView = "dashboard";
  saveState();
  window.location.href = "dashboard.html";
}

function openAuthModal() {
  const overlay = document.getElementById("password-dialog-overlay");
  if (overlay) {
    overlay.style.display = "flex";
    const passwordInput = document.getElementById("input-auth-password");
    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.focus();
    }
    const errorEl = document.getElementById("auth-password-error");
    if (errorEl) {
      errorEl.style.display = "none";
    }
  } else {
    // Fallback if modal HTML is not present
    const pw = prompt("Please enter the system access password to authorize entry:");
    if (pw === "INNOVUS2026") {
      enterWorkspace();
    } else if (pw !== null) {
      alert("Incorrect security key. Access denied.");
    }
  }
}

function closeAuthModal() {
  const overlay = document.getElementById("password-dialog-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function submitAuthPassword() {
  const passwordInput = document.getElementById("input-auth-password");
  const errorEl = document.getElementById("auth-password-error");
  if (passwordInput) {
    if (passwordInput.value === "INNOVUS2026") {
      closeAuthModal();
      enterWorkspace();
    } else {
      if (errorEl) {
        errorEl.style.display = "block";
      }
    }
  }
}

function handleAuthPasswordKey(event) {
  if (event.key === "Enter") {
    submitAuthPassword();
  } else if (event.key === "Escape") {
    closeAuthModal();
  }
}

function enterLandingPage() {
  appState.currentView = "landing";
  saveState();
  window.location.href = "index.html";
}

function switchTab(tabId, element) {
  const tabPages = {
    dashboard: "dashboard.html",
    finder: "explorer.html",
    logs: "logs.html",
    reports: "reports.html",
    analytics: "analytics.html",
    settings: "settings.html"
  };

  const targetPage = tabPages[tabId];
  if (targetPage && !window.location.pathname.endsWith(targetPage)) {
    if (typeof analyticsReconnectTimer !== "undefined" && analyticsReconnectTimer) {
      clearTimeout(analyticsReconnectTimer);
      analyticsReconnectTimer = null;
    }
    // Close WebSocket if navigating away
    if (analyticsSocket) {
      try {
        analyticsSocket.onclose = null;
        analyticsSocket.onerror = null;
        analyticsSocket.close();
      } catch (e) { }
      analyticsSocket = null;
    }
    appState.currentView = tabId === "finder" ? "finder" : tabId;
    saveState();
    window.location.href = targetPage;
  }
}

// ================= TOAST NOTIFICATION =================
function triggerToast(message) {
  const toast = document.getElementById("toast-notify");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.style.display = "flex";

  if (appState.toastTimeout) {
    clearTimeout(appState.toastTimeout);
  }

  appState.toastTimeout = setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ================= ACCORDION & CONFIGS =================
function toggleAccordion(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle("open");
  }
}

function selectYear(element) {
  document.querySelectorAll(".year-tag").forEach(tag => {
    tag.classList.remove("active");
  });
  element.classList.add("active");
  appState.selectedDashboardYear = element.innerText;
  saveState();
  triggerToast(`Target Financial Year set: ${appState.selectedDashboardYear}`);
}

function saveSystemSettings() {
  const thresholdInput = document.getElementById("setting-threshold");
  if (thresholdInput) {
    appState.threshold = parseInt(thresholdInput.value);
  }
  const portInput = document.getElementById("setting-port");
  if (portInput) {
    appState.port = portInput.value.trim();
  }
  saveState();
  triggerToast("InnovaFlow system config saved successfully.");
}

// ================= DARK MODE =================
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  appState.darkModeActive = isDark;
  sessionStorage.setItem("theme_overridden", "true");
  saveState();
  triggerToast(isDark ? "Dark theme active" : "Light theme active");
}

// ================= ADMIN ADD YEAR FEATURE =================
function openAddYearModal() {
  document.getElementById("add-year-dialog-overlay").style.display = "flex";
  document.getElementById("input-add-year").focus();
  document.getElementById("add-year-error").style.display = "none";
}

function closeAddYearModal() {
  document.getElementById("add-year-dialog-overlay").style.display = "none";
  document.getElementById("input-add-year").value = "";
}

function submitAddYear() {
  const input = document.getElementById("input-add-year").value.trim();
  const errorEl = document.getElementById("add-year-error");

  // Format check YYYY-YY
  const formatRegex = /^\d{4}-\d{2}$/;
  if (!formatRegex.test(input)) {
    errorEl.innerText = "Invalid format. Use YYYY-YY (e.g. 2024-25).";
    errorEl.style.display = "block";
    return;
  }

  if (appState.SYSTEM_YEARS.includes(input)) {
    errorEl.innerText = "Financial year already exists.";
    errorEl.style.display = "block";
    return;
  }

  const port = appState.port || "8001";
  const destDir = appState.dashboardDest || "";

  fetch(`http://localhost:${port}/api/add-year`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ year: input, dest_dir: destDir })
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.all_years) {
        appState.SYSTEM_YEARS = data.all_years;
      } else {
        if (!appState.SYSTEM_YEARS.includes(input)) {
          appState.SYSTEM_YEARS.push(input);
          appState.SYSTEM_YEARS.sort();
        }
      }
      saveState();

      if (document.getElementById("dashboard-year-tags")) renderDashboardYears();
      if (document.getElementById("explorer-years-list")) {
        renderExplorerYears();
        renderPinnedYears();
      }
      if (document.getElementById("chart-files-processed")) {
        renderAnalytics();
      }

      closeAddYearModal();
      triggerToast(`Financial Year '${input}' successfully registered.`);
    })
    .catch(err => {
      console.error("Error connecting to backend add-year API:", err);
      if (!appState.SYSTEM_YEARS.includes(input)) {
        appState.SYSTEM_YEARS.push(input);
        appState.SYSTEM_YEARS.sort();
      }
      saveState();

      if (document.getElementById("dashboard-year-tags")) renderDashboardYears();
      if (document.getElementById("explorer-years-list")) {
        renderExplorerYears();
        renderPinnedYears();
      }
      if (document.getElementById("chart-files-processed")) {
        renderAnalytics();
      }

      closeAddYearModal();
      triggerToast(`Financial Year '${input}' registered locally.`);
    });
}

// ================= DASHBOARD DYNAMIC YEARS =================
function renderDashboardYears() {
  const container = document.getElementById("dashboard-year-tags");
  if (!container) return;

  container.innerHTML = "";
  appState.SYSTEM_YEARS.forEach(yr => {
    const el = document.createElement("div");
    el.className = "year-tag";
    if (yr === appState.selectedDashboardYear) el.className += " active";
    el.innerText = yr;
    el.onclick = () => selectYear(el);
    container.appendChild(el);
  });
}

// ================= YEAR EXPLORER LOGIC =================
function renderExplorerYears() {
  const container = document.getElementById("explorer-years-list");
  if (!container) return;
  container.innerHTML = "";

  appState.SYSTEM_YEARS.forEach(yr => {
    const isPinned = appState.pinnedYears.includes(yr);
    const row = document.createElement("div");
    row.className = "year-row";
    if (yr === appState.selectedExplorerYear) row.className += " active";

    row.innerHTML = `
      <span onclick="selectExplorerYear('${yr}')" style="flex-grow: 1;">FY ${yr}</span>
      <span class="year-pin-btn ${isPinned ? 'pinned' : ''}" onclick="togglePinYear('${yr}', event)">
        ${isPinned ? '★' : '☆'}
      </span>
    `;
    container.appendChild(row);
  });
}

function renderPinnedYears() {
  const container = document.getElementById("pinned-years-list");
  if (!container) return;
  container.innerHTML = "";

  if (appState.pinnedYears.length === 0) {
    container.innerHTML = `<div style="padding: 6px 12px; font-size: 11px; color: var(--text-muted);">No pinned years</div>`;
    return;
  }

  appState.pinnedYears.forEach(yr => {
    const row = document.createElement("div");
    row.className = "recent-search-row";
    row.onclick = () => selectExplorerYear(yr);
    row.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <span>FY ${yr}</span>
    `;
    container.appendChild(row);
  });
}

function togglePinYear(yr, event) {
  event.stopPropagation();
  if (appState.pinnedYears.includes(yr)) {
    appState.pinnedYears = appState.pinnedYears.filter(p => p !== yr);
    triggerToast(`FY ${yr} unpinned.`);
  } else {
    appState.pinnedYears.push(yr);
    triggerToast(`FY ${yr} pinned.`);
  }
  saveState();
  renderExplorerYears();
  renderPinnedYears();
}

function updateExplorerParentPathDisplay() {
  const parentPathEl = document.getElementById("explorer-parent-path-text");
  if (parentPathEl) {
    const currentDest = appState.dashboardDest || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
    parentPathEl.innerText = currentDest;
    parentPathEl.title = currentDest;
  }
}

function browseExplorerDestPath() {
  fetch(`${getApiBaseUrl()}/api/browse-directory`, { method: "POST" })
    .then(res => res.json())
    .then(data => {
      if (data.path) {
        appState.dashboardDest = data.path;
        saveState();
        updateExplorerParentPathDisplay();
        triggerToast(`Clean Output Path set to: ${data.path}`);
        if (appState.selectedExplorerYear) {
          selectExplorerYear(appState.selectedExplorerYear);
        }
      }
    })
    .catch(err => {
      console.error("Browse directory failed:", err);
    });
}

function selectExplorerYear(yr) {
  appState.selectedExplorerYear = yr;
  saveState();
  updateExplorerParentPathDisplay();

  const emptyState = document.getElementById("explorer-empty-state");
  const content = document.getElementById("explorer-content");
  const skeleton = document.getElementById("explorer-skeleton");

  if (emptyState) emptyState.style.display = "none";
  if (content) content.style.display = "none";
  if (skeleton) skeleton.style.display = "block";

  // Refresh list highlight
  renderExplorerYears();

  const destPath = appState.dashboardDest || "";
  fetch(`${getApiBaseUrl()}/api/dockets?year=${encodeURIComponent(yr)}&dest_dir=${encodeURIComponent(destPath)}`)
    .then(res => {
      if (!res.ok) throw new Error("HTTP error " + res.status);
      return res.json();
    })
    .then(data => {
      // Clear mock database and update with real directory scan
      DOCKET_DB.length = 0;
      data.forEach(item => DOCKET_DB.push(item));

      if (skeleton) skeleton.style.display = "none";
      if (content) content.style.display = "block";
      const titleEl = document.getElementById("explorer-selected-year-title");
      if (titleEl) titleEl.innerText = `Financial Year ${yr}`;
      renderExplorerDockets();
    })
    .catch(err => {
      console.error("Error fetching real dockets:", err);
      // Fallback: keep existing mock data
      if (skeleton) skeleton.style.display = "none";
      if (content) content.style.display = "block";
      const titleEl = document.getElementById("explorer-selected-year-title");
      if (titleEl) titleEl.innerText = `Financial Year ${yr}`;
      renderExplorerDockets();
    });
}

function updateExplorerView() {
  updateExplorerParentPathDisplay();
  const emptyState = document.getElementById("explorer-empty-state");
  const content = document.getElementById("explorer-content");

  if (appState.selectedExplorerYear === null) {
    if (emptyState) emptyState.style.display = "block";
    if (content) content.style.display = "none";
  } else {
    selectExplorerYear(appState.selectedExplorerYear);
  }
}

function renderExplorerDockets() {
  const year = appState.selectedExplorerYear;
  if (!year) return;

  const container = document.getElementById("explorer-dockets-container");
  if (!container) return;
  container.innerHTML = "";

  // Filter dockets belonging to target year
  let dockets = DOCKET_DB.filter(d => d.years.some(y => y.includes(year)));

  // Filter by search query if any
  const queryInput = document.getElementById("input-finder-query");
  const query = queryInput ? queryInput.value.trim().toLowerCase() : "";
  const isFuzzyEl = document.getElementById("check-fuzzy-match");
  const isFuzzy = isFuzzyEl ? isFuzzyEl.checked : true;

  if (query) {
    dockets = dockets.filter(d => {
      let matchesText = false;
      if (appState.searchFilter === "All") {
        matchesText = d.id.toLowerCase().includes(query) || d.name.toLowerCase().includes(query);
      } else if (appState.searchFilter === "Docket No.") {
        matchesText = d.id.toLowerCase().includes(query);
      } else if (appState.searchFilter === "Party") {
        matchesText = d.name.toLowerCase().includes(query);
      } else if (appState.searchFilter === "Folder") {
        matchesText = d.path.toLowerCase().includes(query);
      } else if (appState.searchFilter === "Year") {
        matchesText = d.years.some(y => y.toLowerCase().includes(query));
      }
      return matchesText;
    });
  }

  // Sort: default is ascending by docket number (natural numerical order)
  const sortSelect = document.getElementById("explorer-sort-select");
  const sortBy = sortSelect ? sortSelect.value : "relevance";
  if (sortBy === "size") {
    dockets.sort((a, b) => b.size.localeCompare(a.size));
  } else if (sortBy === "date") {
    dockets.sort((a, b) => b.modDate.localeCompare(a.modDate));
  } else {
    dockets.sort((a, b) => {
      const matchA = (a.id || "").match(/\d+/) || (a.name || "").match(/\d+/);
      const matchB = (b.id || "").match(/\d+/) || (b.name || "").match(/\d+/);
      const numA = matchA ? parseInt(matchA[0], 10) : 999999;
      const numB = matchB ? parseInt(matchB[0], 10) : 999999;
      if (numA !== numB) {
        return numA - numB;
      }
      return (a.id || "").localeCompare(b.id || "", undefined, { numeric: true, sensitivity: 'base' });
    });
  }

  // Update Summary cards
  renderYearSummaryCards(dockets);

  // Update results counter
  const resultsCount = document.getElementById("explorer-results-count");
  if (resultsCount) resultsCount.innerText = `Found ${dockets.length} docket(s) matching criteria`;
  const paginationText = document.getElementById("explorer-pagination-text");
  if (paginationText) paginationText.innerText = `Showing 1-${dockets.length} of ${dockets.length}`;

  if (dockets.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; border: 1px dashed var(--border-med); border-radius: var(--panel-radius); color: var(--text-muted); background-color: var(--bg-surface);">
        No records found matching criteria for FY ${year}.
      </div>
    `;
    return;
  }

  dockets.forEach(d => {
    const card = document.createElement("div");
    card.className = "docket-detail-card";
    const isTreeOpen = appState.activeTreeDockets[d.id];

    card.innerHTML = `
      <div class="docket-detail-header">
        <span class="badge ${d.active ? 'badge-active' : 'badge-review'}">${d.active ? 'Active' : 'Archived'}</span>
        <span class="docket-detail-title mono">${d.id}</span>
      </div>
      <div class="docket-detail-party">${d.name}</div>
      <div class="docket-tags">
        ${d.years.map(y => `<span class="tag-yellow">${y}</span>`).join('')}
      </div>
      <div class="path-definition-block">
        <a href="#" class="path-link mono" onclick="triggerToast('Local path: ${d.path}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          ${d.path}
        </a>
        <div class="path-meta mono">
          <span>${d.size}</span>
          <span>Mod: ${d.modDate}</span>
          <span>${d.employee}</span>
        </div>
      </div>
      <div class="docket-actions">
        <div class="action-buttons-left">
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="openLocalFolder('${d.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            Open Folder
          </button>
          <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="openLocalParent('${d.id}')">Parent Dir</button>
        </div>
        <button class="btn-secondary" style="padding: 6px 12px; font-size: 11px;" onclick="toggleExplorerTree('${d.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Preview Tree
        </button>
      </div>
      <div class="tree-preview-container" id="tree-${d.id}" style="display: ${isTreeOpen ? 'block' : 'none'};">
        <div class="tree-header">
          <span>File Tree Preview</span>
          <span>nodes: ${d.tree.length}</span>
        </div>
        <div class="tree-body mono">
          ${renderTreeDiagram(d.tree)}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTreeDiagram(treeData) {
  let html = "";
  treeData.forEach((node, index) => {
    const isLast = index === treeData.length - 1;
    let prefix = "";
    for (let i = 0; i < node.indent; i++) {
      prefix += '<span class="tree-indent">│</span>';
    }

    let connector = node.indent > 0 ? (isLast ? "└── " : "├── ") : "";
    let icon = node.type === "folder" ?
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; color: var(--text-main);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>` :
      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px; color: var(--text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

    html += `
      <div class="tree-node">
        ${prefix}
        <span class="tree-connector">${connector}</span>
        ${icon}
        <span class="${node.type === 'folder' ? 'tree-folder' : 'tree-file'}">${node.name}</span>
      </div>
    `;
  });
  return html;
}

function renderYearSummaryCards(docketsList) {
  const container = document.getElementById("explorer-summary-cards");
  if (!container) return;

  let totalDockets = docketsList.length;
  let totalFiles = 0;
  let revisions = totalDockets * 4;
  let duplicates = totalDockets * 2;

  let totalMB = 0;
  docketsList.forEach(d => {
    totalFiles += d.tree.filter(n => n.type === "file").length;
    if (d.size.includes("GB")) {
      totalMB += parseFloat(d.size) * 1024;
    } else if (d.size.includes("MB")) {
      totalMB += parseFloat(d.size);
    }
  });

  const formattedStorage = totalMB >= 1024 ? `${(totalMB / 1024).toFixed(1)} GB` : `${Math.round(totalMB)} MB`;

  container.innerHTML = `
    <div class="stat-box" style="padding: 10px; min-height: auto; flex-direction: column; align-items: flex-start; gap: 4px;">
      <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Total Dockets</span>
      <span class="mono" style="font-size: 16px; font-weight: 700; color: var(--text-main);">${totalDockets}</span>
    </div>
    <div class="stat-box" style="padding: 10px; min-height: auto; flex-direction: column; align-items: flex-start; gap: 4px;">
      <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Total Files</span>
      <span class="mono" style="font-size: 16px; font-weight: 700; color: var(--text-main);">${totalFiles}</span>
    </div>
    <div class="stat-box" style="padding: 10px; min-height: auto; flex-direction: column; align-items: flex-start; gap: 4px;">
      <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Storage Used</span>
      <span class="mono" style="font-size: 16px; font-weight: 700; color: var(--text-main);">${formattedStorage}</span>
    </div>
    <div class="stat-box" style="padding: 10px; min-height: auto; flex-direction: column; align-items: flex-start; gap: 4px;">
      <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Revisions</span>
      <span class="mono" style="font-size: 16px; font-weight: 700; color: var(--text-main);">${revisions}</span>
    </div>
    <div class="stat-box" style="padding: 10px; min-height: auto; flex-direction: column; align-items: flex-start; gap: 4px;">
      <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Duplicates</span>
      <span class="mono" style="font-size: 16px; font-weight: 700; color: var(--text-main);">${duplicates}</span>
    </div>
  `;
}

function toggleExplorerTree(docketId) {
  appState.activeTreeDockets[docketId] = !appState.activeTreeDockets[docketId];
  saveState();
  const container = document.getElementById(`tree-${docketId}`);
  if (container) {
    container.style.display = appState.activeTreeDockets[docketId] ? "block" : "none";
  }
}

function openLocalFolder(docketId) {
  const docket = DOCKET_DB.find(d => d.id === docketId);
  if (!docket) {
    triggerToast("Error: Docket not found");
    return;
  }
  const path = docket.path;
  triggerToast('Opening local folder...');
  fetch(`${getApiBaseUrl()}/api/open-folder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ path: path })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.detail || `Server error ${res.status}`);
        }).catch(() => {
          throw new Error(`HTTP error ${res.status}`);
        });
      }
      return res.json();
    })
    .then(data => {
      triggerToast('Folder opened successfully');
    })
    .catch(err => {
      triggerToast(`Error opening folder: ${err.message}`);
    });
}

function openLocalParent(docketId) {
  const docket = DOCKET_DB.find(d => d.id === docketId);
  if (!docket) {
    triggerToast("Error: Docket not found");
    return;
  }
  const path = docket.path;
  triggerToast('Accessing parent directory...');
  fetch(`${getApiBaseUrl()}/api/open-parent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ path: path })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.detail || `Server error ${res.status}`);
        }).catch(() => {
          throw new Error(`HTTP error ${res.status}`);
        });
      }
      return res.json();
    })
    .then(data => {
      triggerToast('Parent directory opened successfully');
    })
    .catch(err => {
      triggerToast(`Error opening parent directory: ${err.message}`);
    });
}

function executeSearch() {
  const queryInput = document.getElementById("input-finder-query");
  const query = queryInput ? queryInput.value.trim() : "";
  if (query && !appState.recentSearches.includes(query)) {
    appState.recentSearches.unshift(query);
    if (appState.recentSearches.length > 5) appState.recentSearches.pop();
    saveState();
    renderRecentSearches();
  }
  renderExplorerDockets();
}

function fillSearch(query) {
  const queryInput = document.getElementById("input-finder-query");
  if (queryInput) {
    queryInput.value = query;
  }
  executeSearch();
}

function setSearchFilter(filterType, element) {
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  if (element) element.classList.add("active");
  appState.searchFilter = filterType;
  saveState();
  executeSearch();
}

function handleSearchKeyPress(event) {
  if (event.key === "Enter") {
    executeSearch();
  }
}

function renderRecentSearches() {
  const container = document.getElementById("recent-searches-list");
  if (!container) return;
  container.innerHTML = "";

  appState.recentSearches.forEach(q => {
    const el = document.createElement("div");
    el.className = "recent-search-row";
    el.onclick = () => fillSearch(q);
    el.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <span>${q}</span>
    `;
    container.appendChild(el);
  });
}

function renderRecentReports() {
  const container = document.getElementById("recent-reports-list");
  if (!container) return;
  container.innerHTML = "";

  if (appState.recentReports.length === 0) {
    container.innerHTML = `<div style="padding: 6px 12px; font-size: 11px; color: var(--text-muted);">No reports yet</div>`;
    return;
  }

  appState.recentReports.forEach(rep => {
    const el = document.createElement("div");
    el.className = "recent-search-row";
    el.onclick = () => {
      appState.activeReportId = rep;
      saveState();
      renderReportsTable();
      switchTab("reports");
    };
    el.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <span>${rep}</span>
    `;
    container.appendChild(el);
  });
}

// ================= LOG STREAM SIMULATION =================
function runOrganizer() {
  if (appState.currentView === "dashboard") {
    const excelInput = document.getElementById("input-master-excel");
    const sourceInput = document.getElementById("input-source-dirs");
    const destInput = document.getElementById("input-dest-path");

    if (excelInput) appState.dashboardExcel = excelInput.value.trim();
    if (sourceInput) appState.dashboardSource = sourceInput.value.trim();
    if (destInput) appState.dashboardDest = destInput.value.trim();
  }

  sessionStorage.setItem("trigger_run", "true");
  saveState();
  switchTab("logs");
}

// Auto start log run if we redirected to logs.html and logs are not already active
if (window.location.pathname.endsWith("logs.html") && sessionStorage.getItem("trigger_run") === "true") {
  sessionStorage.removeItem("trigger_run");
  setTimeout(() => {
    triggerLogsSimulationRun();
  }, 100);
}

function extractPartyName(folderName) {
  let cleaned = folderName.replace(/^\d+[-_]*/, "");
  cleaned = cleaned.replace(/_/g, " ");
  cleaned = cleaned.trim();
  return cleaned || "Unknown Party";
}

function triggerLogsSimulationRun() {
  setupLogFiltersYearOptions();

  appState.logsRunning = true;
  appState.liveLogs = [];
  saveState();

  const logConsole = document.getElementById("log-console-body");
  if (logConsole) logConsole.innerHTML = "";

  const statusEl = document.getElementById("logs-run-status");
  if (statusEl) statusEl.innerText = "Connecting to organizer engine...";

  document.getElementById("run-matrix-drive").innerText = "Local";
  document.getElementById("run-matrix-folder").innerText = "Initializing...";
  document.getElementById("run-matrix-file").innerText = "Checking Paths...";
  document.getElementById("run-matrix-op").innerText = "Connecting API";
  document.getElementById("run-matrix-elapsed").innerText = "0s";
  document.getElementById("run-matrix-remaining").innerText = "Calculating...";

  updateProgress(0);

  const excelPath = appState.dashboardExcel || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\excel.xlsx";
  const sourceDirsRaw = appState.dashboardSource || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Raw_Data";
  const destPath = appState.dashboardDest || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
  const targetYear = appState.selectedDashboardYear || "2023-24";
  const threshold = appState.threshold || 50;
  const port = appState.port || "8001";

  const sourceDir = sourceDirsRaw.split(",")[0].trim();

  appendConsoleLog(`Connecting to WebSocket API Server on port ${port}...`, "info");

  const wsUrl = `${getWsBaseUrl()}/api/run-organizer/ws`;
  let socket;
  try {
    socket = new WebSocket(wsUrl);
  } catch (e) {
    appendConsoleLog(`✗ WebSocket connection failed: ${e.message}`, "error");
    if (statusEl) statusEl.innerText = "Connection Failed";
    appState.logsRunning = false;
    return;
  }

  const startTime = Date.now();
  let elapsedInterval = setInterval(() => {
    const elapsedSecs = Math.round((Date.now() - startTime) / 1000);
    const elapsedEl = document.getElementById("run-matrix-elapsed");
    if (elapsedEl) elapsedEl.innerText = elapsedSecs + "s";
  }, 1000);

  let totalFolders = 0;
  let totalFiles = 0;

  // Real-time counters
  let foldersProcessed = 0;
  let filesProcessed = 0;
  let routed = 0;
  let duplicates = 0;
  let revisions = 0;
  let reviews = 0;
  let errors = 0;

  let matchedFoldersList = [];
  let rejectedFoldersList = [];
  let runRevisions = [];
  let runFiles = [];

  socket.onopen = () => {
    appendConsoleLog("✓ WebSocket Connected. Sending config...", "success");
    socket.send(JSON.stringify({
      excel_path: excelPath,
      source_dir: sourceDir,
      dest_dir: destPath,
      sheets: [targetYear],
      threshold: threshold
    }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "info") {
      appendConsoleLog(data.text, "info");
    } else if (data.type === "success_msg") {
      appendConsoleLog(data.text, "success");
    } else if (data.type === "warning_msg") {
      appendConsoleLog(data.text, "warning");
    } else if (data.type === "error_msg") {
      appendConsoleLog(data.text, "error");
    } else if (data.type === "init") {
      totalFolders = data.total_folders;
      totalFiles = data.total_files;
      appendConsoleLog(`Located ${totalFiles} files across ${totalFolders} folders in source directory.`, "success");
      
      const scannedFiles = document.getElementById("stats-scanned-files");
      const scannedFolders = document.getElementById("stats-scanned-folders");
      if (scannedFiles) scannedFiles.innerText = "0";
      if (scannedFolders) scannedFolders.innerText = "0";
      
      const processedVal = document.getElementById("stats-val-processed");
      const routedVal = document.getElementById("stats-val-routed");
      const dupsVal = document.getElementById("stats-val-duplicates");
      const revsVal = document.getElementById("stats-val-revisions");
      const reviewsVal = document.getElementById("stats-val-reviews");
      const errorsVal = document.getElementById("stats-val-errors");

      if (processedVal) processedVal.innerText = "0";
      if (routedVal) routedVal.innerText = "0";
      if (dupsVal) dupsVal.innerText = "0";
      if (revsVal) revsVal.innerText = "0";
      if (reviewsVal) reviewsVal.innerText = "0";
      if (errorsVal) errorsVal.innerText = "0";

      if (statusEl) statusEl.innerText = "Processing Dockets...";
    } else if (data.type === "folder_start") {
      document.getElementById("run-matrix-folder").innerText = data.folder;
      document.getElementById("run-matrix-op").innerText = data.operation;
      document.getElementById("logs-current-task").innerText = `Current: ${data.operation} on ${data.folder}`;
    } else if (data.type === "file_processed") {
      filesProcessed++;
      runFiles.push(data.file);
      
      if (data.status === "copied") {
        // Normal copy
      } else if (data.status === "duplicate") {
        duplicates++;
      } else if (data.status === "revision") {
        revisions++;
        runRevisions.push(data.file);
      } else if (data.status.startsWith("error")) {
        errors++;
      }

      document.getElementById("run-matrix-file").innerText = data.file;

      const scannedFiles = document.getElementById("stats-scanned-files");
      if (scannedFiles) scannedFiles.innerText = filesProcessed.toLocaleString();

      const processedVal = document.getElementById("stats-val-processed");
      if (processedVal) processedVal.innerText = filesProcessed.toLocaleString();

      const dupsVal = document.getElementById("stats-val-duplicates");
      if (dupsVal) dupsVal.innerText = duplicates.toLocaleString();

      const revsVal = document.getElementById("stats-val-revisions");
      if (revsVal) revsVal.innerText = revisions.toLocaleString();

      const errorsVal = document.getElementById("stats-val-errors");
      if (errorsVal) errorsVal.innerText = errors.toLocaleString();

    } else if (data.type === "folder_complete") {
      foldersProcessed++;
      
      const scannedFolders = document.getElementById("stats-scanned-folders");
      if (scannedFolders) scannedFolders.innerText = foldersProcessed.toLocaleString();

      if (data.matched) {
        routed++;
        const routedVal = document.getElementById("stats-val-routed");
        if (routedVal) routedVal.innerText = routed.toLocaleString();

        const logText = `✓ Match: Folder "${data.folder}" → Docket ${data.docket} (FY ${targetYear}) [Score: ${data.score}%]. Migrated ${data.files_copied} files.`;
        appendConsoleLog(logText, "success");

        appState.liveLogs.push({
          text: logText,
          type: "success",
          docket: data.docket,
          error: "",
          year: targetYear
        });

        matchedFoldersList.push({
          original_name: data.folder,
          routed_to_year: targetYear,
          docket: data.docket,
          confidence_score: data.score,
          files_migrated: data.files_copied,
          excel_real_name: data.excel_real_name || "Unknown"
        });

        // Update DOCKET_DB
        const existingDocket = DOCKET_DB.find(d => d.id === data.docket);
        if (existingDocket) {
          if (!existingDocket.years.includes("FY " + targetYear)) {
            existingDocket.years.push("FY " + targetYear);
          }
          existingDocket.active = true;
        } else {
          const partyName = extractPartyName(data.folder);
          const newDocket = {
            id: data.docket,
            active: true,
            name: partyName,
            pinned: false,
            years: ["FY " + targetYear],
            path: `${destPath}/${targetYear}/${data.folder}`,
            size: `${data.files_copied * 2} MB`,
            modDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            employee: "System",
            tree: [
              { type: "folder", name: data.folder, indent: 0 }
            ]
          };
          for (let i = 1; i <= data.files_copied; i++) {
            newDocket.tree.push({ type: "file", name: `Document_${i}.pdf`, indent: 1 });
          }
          DOCKET_DB.push(newDocket);
        }

      } else {
        reviews++;
        const reviewsVal = document.getElementById("stats-val-reviews");
        if (reviewsVal) reviewsVal.innerText = reviews.toLocaleString();

        const logText = `⚠ Rejected: Folder "${data.folder}" failed to match threshold (Best score: ${data.score}%).`;
        appendConsoleLog(logText, "warning");

        appState.liveLogs.push({
          text: logText,
          type: "warning",
          docket: "",
          error: "LowConfidence",
          year: targetYear
        });

        rejectedFoldersList.push({
          original_name: data.folder,
          best_score: data.score,
          excel_real_name: data.excel_real_name || "Unknown"
        });
      }

      // Update progress percentage
      if (totalFolders > 0) {
        const pct = Math.round((foldersProcessed / totalFolders) * 100);
        updateProgress(pct);

        // Estimate remaining time
        const elapsedSecs = Math.round((Date.now() - startTime) / 1000);
        if (foldersProcessed > 0) {
          const totalEstSecs = Math.round(elapsedSecs / (foldersProcessed / totalFolders));
          const remainingSecs = Math.max(0, totalEstSecs - elapsedSecs);
          const remainingEl = document.getElementById("run-matrix-remaining");
          if (remainingEl) remainingEl.innerText = remainingSecs + "s";
        }
      }
    } else if (data.type === "complete") {
      clearInterval(elapsedInterval);
      socket.close();

      updateProgress(100);

      // Save processed and rejected listings
      appState.processedTransactions = matchedFoldersList.map(item => ({
        id: item.docket,
        original_name: item.original_name,
        year: targetYear,
        files: item.files_migrated,
        excel_real_name: item.excel_real_name || "Unknown",
        confidence_score: item.confidence_score
      }));
      appState.pendingReviews = rejectedFoldersList.map(item => ({
        original_name: item.original_name,
        best_score: item.best_score,
        year: targetYear,
        excel_real_name: item.excel_real_name || "Unknown"
      }));

      document.getElementById("run-matrix-remaining").innerText = "0s";
      document.getElementById("run-matrix-op").innerText = "Completed";
      document.getElementById("run-matrix-folder").innerText = `FY ${targetYear}`;
      document.getElementById("run-matrix-file").innerText = "Commit Done";

      appState.logsRunning = false;

      if (statusEl) statusEl.innerText = "Run Complete";
      const currentTask = document.getElementById("logs-current-task");
      if (currentTask) currentTask.innerText = "All operations committed. Storage synced.";
      
      const now = new Date();
      const yr = now.getFullYear();
      const mn = String(now.getMonth() + 1).padStart(2, '0');
      const dy = String(now.getDate()).padStart(2, '0');
      const hr = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      const fullTimestamp = `${yr}-${mn}-${dy} ${hr}:${min}:${sec}`;

      const newReport = {
        id: "Run #1",  // Placeholder, will be re-indexed below
        timestamp: fullTimestamp,
        targetYear: targetYear,
        summary: {
          total_processed: totalFolders,
          successful_matches: routed,
          rejected_unmatched: reviews
        },
        processedTransactions: [...appState.processedTransactions],
        pendingReviews: [...appState.pendingReviews],
        bufferedTransactions: []
      };

      if (!appState.iterationReports) appState.iterationReports = [];
      appState.iterationReports.unshift(newReport);

      if (appState.iterationReports.length > 10) {
        appState.iterationReports = appState.iterationReports.slice(0, 10);
      }

      appState.iterationReports.forEach((rep, index) => {
        rep.id = getReportName(rep, index);
      });

      appState.recentReports = appState.iterationReports.map(r => r.id);
      appState.activeReportId = appState.iterationReports[0].id;
      saveState();
      initReportsSubmenu();

      // Populate Success Modal dynamically with realtime run statistics
      const elapsedSecs = Math.round((Date.now() - startTime) / 1000);
      const elapsedStr = elapsedSecs < 60 ? `${elapsedSecs}s` : `${Math.floor(elapsedSecs / 60)}m ${elapsedSecs % 60}s`;

      const successProcessedVal = document.getElementById("success-processed-val");
      const successElapsedVal = document.getElementById("success-elapsed-val");
      const successRevisionsVal = document.getElementById("success-revisions-val");
      const successRevisionsTitle = document.getElementById("success-revisions-title");
      const successRevisionsTbody = document.getElementById("success-revisions-tbody");

      if (successProcessedVal) successProcessedVal.innerText = filesProcessed.toLocaleString();
      if (successElapsedVal) successElapsedVal.innerText = elapsedStr;
      if (successRevisionsVal) successRevisionsVal.innerText = revisions.toLocaleString();

      if (successRevisionsTbody) {
        successRevisionsTbody.innerHTML = "";
        if (runRevisions.length > 0) {
          if (successRevisionsTitle) successRevisionsTitle.innerText = "Revision History Preview";
          runRevisions.slice(0, 3).forEach(file => {
            let version = "v2.0";
            const vMatch = file.match(/_v(\d+)\.[^.]+$/);
            if (vMatch) {
              version = `v${vMatch[1]}.0`;
            }
            successRevisionsTbody.innerHTML += `
              <tr>
                <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;" title="${file}">${file}</td>
                <td>${version}</td>
                <td class="text-muted">Just now</td>
              </tr>
            `;
          });
        } else {
          if (successRevisionsTitle) successRevisionsTitle.innerText = "Recently Routed Files";
          if (runFiles.length > 0) {
            runFiles.slice(0, 3).forEach(file => {
              successRevisionsTbody.innerHTML += `
                <tr>
                  <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;" title="${file}">${file}</td>
                  <td>v1.0</td>
                  <td class="text-muted">Just now</td>
                </tr>
              `;
            });
          } else {
            successRevisionsTbody.innerHTML = `
              <tr>
                <td colspan="3" style="text-align: center; color: var(--text-muted); font-size: 11px; padding: 15px 0;">No files processed in this run</td>
              </tr>
            `;
          }
        }
      }

      setTimeout(() => {
        const modal = document.getElementById("success-modal-overlay");
        if (modal) modal.style.display = "flex";
      }, 1000);
    }
  };

  socket.onerror = (err) => {
    console.error("Organizer WebSocket error:", err);
    appendConsoleLog(`✗ WebSocket Error: Connection failed`, "error");
    clearInterval(elapsedInterval);
    appState.logsRunning = false;
    saveState();
    if (statusEl) statusEl.innerText = "Error Occurred";
  };

  socket.onclose = (event) => {
    console.log("Organizer WebSocket closed:", event);
    clearInterval(elapsedInterval);
  };
}

function updateProgress(val) {
  const valEl = document.getElementById("logs-progress-val");
  const barEl = document.getElementById("logs-progress-bar");
  if (valEl) valEl.innerText = `${val}%`;
  if (barEl) barEl.style.width = `${val}%`;
}

function updateRunningStats(progress) {
  const targetFiles = 1450;
  const targetFolders = 85;
  const targetRouted = 1272;
  const targetDuplicates = 145;
  const targetRevisions = 87;
  const targetReviews = 23;
  const targetErrors = 3;

  const fraction = progress / 100;

  const currentFiles = Math.round(targetFiles * fraction);
  const currentFolders = Math.round(targetFolders * fraction);
  const currentRouted = Math.round(targetRouted * fraction);
  const currentDuplicates = Math.round(targetDuplicates * fraction);
  const currentRevisions = Math.round(targetRevisions * fraction);
  const currentReviews = Math.round(targetReviews * fraction);
  const currentErrors = Math.round(targetErrors * fraction);

  const scannedFiles = document.getElementById("stats-scanned-files");
  if (scannedFiles) scannedFiles.innerText = currentFiles.toLocaleString();
  const scannedFolders = document.getElementById("stats-scanned-folders");
  if (scannedFolders) scannedFolders.innerText = currentFolders.toLocaleString();

  const processedVal = document.getElementById("stats-val-processed");
  if (processedVal) processedVal.innerText = currentFiles.toLocaleString();
  const routedVal = document.getElementById("stats-val-routed");
  if (routedVal) routedVal.innerText = currentRouted.toLocaleString();
  const dupsVal = document.getElementById("stats-val-duplicates");
  if (dupsVal) dupsVal.innerText = currentDuplicates.toLocaleString();
  const revsVal = document.getElementById("stats-val-revisions");
  if (revsVal) revsVal.innerText = currentRevisions.toLocaleString();
  const reviewsVal = document.getElementById("stats-val-reviews");
  if (reviewsVal) reviewsVal.innerText = currentReviews.toLocaleString();
  const errorsVal = document.getElementById("stats-val-errors");
  if (errorsVal) errorsVal.innerText = currentErrors.toLocaleString();
}

function updateOperationMatrix(progress, startTime, year) {
  const elapsedSecs = Math.round((Date.now() - startTime) / 1000);
  const elapsedEl = document.getElementById("run-matrix-elapsed");
  if (elapsedEl) elapsedEl.innerText = elapsedSecs + "s";

  if (progress > 0) {
    const totalEstSecs = Math.round(elapsedSecs / (progress / 100));
    const remainingSecs = Math.max(0, totalEstSecs - elapsedSecs);
    const remainingEl = document.getElementById("run-matrix-remaining");
    if (remainingEl) remainingEl.innerText = remainingSecs + "s";
  }

  const paths = [
    { dir: `/Litigation/${year}/TechCorp`, file: "Complaint_TechCorp.pdf", op: "Scanning Metadata" },
    { dir: `/Litigation/${year}/TechCorp`, file: "Answer_TaxDept.xlsx", op: "Analyzing Classifiers" },
    { dir: `/Corporate/${year}/AlphaCorp`, file: "Purchase_Agreement_v3.pdf", op: "Routing File Store" },
    { dir: `/Litigation/${year}/BetaLLC`, file: "Summons_Records.pdf", op: "Calculating Confidence" },
    { dir: `/Audits/${year}/Q3_Financials`, file: "Ledger_Reconciled.xlsx", op: "Auto-routing Record" },
    { dir: `/Bankruptcy/${year}/Omega`, file: "Petition_Bankruptcy.docx", op: "Resolving Duplicate" }
  ];

  const index = Math.min(paths.length - 1, Math.floor(progress / (100 / paths.length)));
  const currentPath = paths[index];

  const folderEl = document.getElementById("run-matrix-folder");
  if (folderEl) folderEl.innerText = currentPath.dir;
  const fileEl = document.getElementById("run-matrix-file");
  if (fileEl) fileEl.innerText = currentPath.file;
  const opEl = document.getElementById("run-matrix-op");
  if (opEl) opEl.innerText = currentPath.op;

  const currentTask = document.getElementById("logs-current-task");
  if (currentTask) currentTask.innerText = `Current: ${currentPath.op} on ${currentPath.file}`;
}

function appendConsoleLog(text, type) {
  const body = document.getElementById("log-console-body");
  if (!body) return;
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const line = document.createElement("div");
  line.className = "log-line";

  let typeClass = "";
  if (type === "success") typeClass = "log-success";
  if (type === "warning") typeClass = "log-warning";
  if (type === "error") typeClass = "log-error";

  line.innerHTML = `
    <span class="log-timestamp">[${time}]</span>
    <span class="log-content ${typeClass}">${text}</span>
  `;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}

function resetLogConsole() {
  const body = document.getElementById("log-console-body");
  if (body) body.innerHTML = "";
  updateProgress(0);
  const statusEl = document.getElementById("logs-run-status");
  if (statusEl) statusEl.innerText = "Organizer Idle";
  const currentTask = document.getElementById("logs-current-task");
  if (currentTask) currentTask.innerText = "Awaiting run initialization...";
  updateRunningStats(0);
  appState.liveLogs = [];
  saveState();
}

// ================= LOG STREAM FILTER PANEL =================
function setupLogFiltersYearOptions() {
  const selector = document.getElementById("log-filter-year");
  if (!selector) return;
  selector.innerHTML = `<option value="All">All Years</option>`;

  appState.SYSTEM_YEARS.forEach(yr => {
    const opt = document.createElement("option");
    opt.value = yr;
    opt.innerText = yr;
    if (yr === appState.selectedDashboardYear) opt.selected = true;
    selector.appendChild(opt);
  });
}

function shouldShowLogEntry(entry) {
  const yrFilterEl = document.getElementById("log-filter-year");
  const yearFilter = yrFilterEl ? yrFilterEl.value : "All";

  const docketFilterEl = document.getElementById("log-filter-docket");
  const docketFilter = docketFilterEl ? docketFilterEl.value.trim().toLowerCase() : "";

  const statusFilterEl = document.getElementById("log-filter-status");
  const statusFilter = statusFilterEl ? statusFilterEl.value : "All";

  const errorFilterEl = document.getElementById("log-filter-errortype");
  const errorFilter = errorFilterEl ? errorFilterEl.value : "All";

  if (yearFilter !== "All" && entry.year !== yearFilter) return false;
  if (docketFilter && entry.docket && !entry.docket.toLowerCase().includes(docketFilter)) return false;
  if (statusFilter !== "All" && entry.type !== statusFilter) return false;
  if (errorFilter !== "All" && (!entry.error || entry.error !== errorFilter)) return false;

  return true;
}

function applyLogFilters() {
  const body = document.getElementById("log-console-body");
  if (!body) return;
  body.innerHTML = "";

  appState.liveLogs.forEach(entry => {
    if (shouldShowLogEntry(entry)) {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const line = document.createElement("div");
      line.className = "log-line";

      let typeClass = "";
      if (entry.type === "success") typeClass = "log-success";
      if (entry.type === "warning") typeClass = "log-warning";
      if (entry.type === "error") typeClass = "log-error";

      line.innerHTML = `
        <span class="log-timestamp">[${time}]</span>
        <span class="log-content ${typeClass}">${entry.text}</span>
      `;
      body.appendChild(line);
    }
  });
  body.scrollTop = body.scrollHeight;
}

// ================= REPORTS VIEW MANAGER =================
function selectReport(reportId) {
  appState.activeReportId = reportId;
  saveState();
  renderReportsTable();
}

function updateReportsView() {
  const emptyState = document.getElementById("reports-empty-state");
  const content = document.getElementById("reports-content");

  if (!appState.iterationReports || appState.iterationReports.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (content) content.style.display = "none";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (content) content.style.display = "block";
  }
}

function renderReportsTable() {
  updateReportsView();
  updateReportsPathUI();
  updateReportsHistoryDropdown();
  if (!appState.iterationReports || appState.iterationReports.length === 0) return;

  // Find active report
  let activeReport = appState.iterationReports.find(r => r.id === appState.activeReportId);
  if (!activeReport) {
    activeReport = appState.iterationReports[0];
    appState.activeReportId = activeReport.id;
    saveState();
  }

  // Ensure buffered transactions array is initialized
  if (!activeReport.bufferedTransactions) {
    activeReport.bufferedTransactions = [];
  }

  // Refresh sidebar submenu
  initReportsSubmenu();

  // Render Right Details Panel
  const detailTitle = document.getElementById("report-detail-title");
  if (detailTitle) detailTitle.innerText = `${activeReport.id} Overview`;

  const detailTime = document.getElementById("report-detail-time");
  if (detailTime) detailTime.innerText = `Timestamp: ${activeReport.timestamp}`;

  const detailYear = document.getElementById("report-detail-year");
  if (detailYear) detailYear.innerText = `FY ${activeReport.targetYear}`;

  const metaFolders = document.getElementById("report-meta-folders");
  if (metaFolders) metaFolders.innerText = activeReport.summary.total_processed;

  const metaSuccess = document.getElementById("report-meta-success");
  if (metaSuccess) metaSuccess.innerText = activeReport.summary.successful_matches;

  const metaReviews = document.getElementById("report-meta-reviews");
  if (metaReviews) metaReviews.innerText = activeReport.summary.rejected_unmatched;

  // Render Tables
  const pendingTbody = document.getElementById("pending-reviews-tbody");
  const processedTbody = document.getElementById("processed-transactions-tbody");

  if (pendingTbody) {
    pendingTbody.innerHTML = "";
    const reviews = activeReport.pendingReviews || [];
    if (reviews.length === 0) {
      pendingTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 15px;">No pending manual reviews</td></tr>`;
    } else {
      reviews.forEach((item, index) => {
        const isSelected = !!item.selected;
        const rowId = `review-row-${index}`;
        const escapedName = (item.original_name || "").replace(/'/g, "\\'");
        pendingTbody.innerHTML += `
          <tr id="${rowId}" style="${isSelected ? 'background: rgba(16, 185, 129, 0.06);' : ''}">
            <td style="text-align: center;">
              <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelectPendingItem('${escapedName}', this.checked)" style="cursor: pointer; accent-color: var(--accent-yellow, #eab308); transform: scale(1.1);">
            </td>
            <td class="mono wrap-column">${item.original_name}</td>
            <td>${item.excel_real_name || "Unknown"}</td>
            <td style="text-align: center;"><span class="badge badge-review">${item.best_score}% Match</span></td>
            <td class="mono">/Unmatched/FY ${item.year}</td>
            <td style="text-align: center;">
              <button class="${isSelected ? 'btn-primary' : 'btn-secondary'}" style="padding: 4px 10px; font-size: 10px; ${isSelected ? 'background: linear-gradient(135deg, #10b981, #059669); border-color: #047857; color: #fff;' : ''}" onclick="toggleSelectPendingItem('${escapedName}')">
                ${isSelected ? '✓ Selected' : 'Select'}
              </button>
            </td>
          </tr>
        `;
      });
    }
  }

  // Update export button and select all button state
  const exportBtn = document.getElementById("export-selected-btn");
  const selectAllBtn = document.getElementById("select-all-pending-btn");
  const headerCheckbox = document.getElementById("header-select-all-checkbox");

  if (activeReport && activeReport.pendingReviews) {
    const reviews = activeReport.pendingReviews;
    const selectedCount = reviews.filter(i => i.selected).length;
    const totalCount = reviews.length;

    if (exportBtn) {
      exportBtn.innerText = `Export Selected Transactions (${selectedCount})`;
      exportBtn.disabled = selectedCount === 0;
      exportBtn.style.opacity = selectedCount === 0 ? "0.5" : "1";
      exportBtn.style.cursor = selectedCount === 0 ? "not-allowed" : "pointer";
    }

    if (selectAllBtn) {
      const allSelected = totalCount > 0 && selectedCount === totalCount;
      selectAllBtn.innerText = allSelected ? "Deselect All" : "Select All";
    }

    if (headerCheckbox) {
      headerCheckbox.checked = totalCount > 0 && selectedCount === totalCount;
      headerCheckbox.indeterminate = selectedCount > 0 && selectedCount < totalCount;
    }
  }

  if (processedTbody) {
    processedTbody.innerHTML = "";
    const processed = [...(activeReport.processedTransactions || [])];
    processed.sort((a, b) => {
      const idA = String(a.id || "");
      const idB = String(b.id || "");
      return idA.localeCompare(idB, undefined, { numeric: true, sensitivity: 'base' });
    });
    if (processed.length === 0) {
      processedTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 15px;">No processed transactions yet</td></tr>`;
    } else {
      processed.forEach((item) => {
        let category = "Corporate";
        const nameLower = item.original_name.toLowerCase();
        if (nameLower.includes("sbi") || nameLower.includes("audit")) {
          category = "Audit";
        } else if (nameLower.includes("vs") || nameLower.includes("state")) {
          category = "Litigation";
        }

        const scoreVal = (item.confidence_score !== undefined && item.confidence_score !== null) ? item.confidence_score : 100;

        processedTbody.innerHTML += `
          <tr>
            <td class="mono">${item.id}</td>
            <td>${category}</td>
            <td>${item.excel_real_name || "Unknown"}</td>
            <td class="mono wrap-column">${item.original_name}</td>
            <td style="text-align: center;"><span class="badge ${scoreVal >= 75 ? 'badge-active' : 'badge-review'}">${scoreVal}% Match</span></td>
            <td style="text-align: center;"><span class="badge badge-active">Ingested (${item.files} files)</span></td>
          </tr>
        `;
      });
    }
  }
}

function approveRouteOnBackend(originalNames, targetYear) {
  const excelPath = appState.dashboardExcel || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\excel.xlsx";
  const sourceDirsRaw = appState.dashboardSource || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Raw_Data";
  const destPath = appState.dashboardDest || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
  const sourceDir = sourceDirsRaw.split(",")[0].trim();

  return fetch(`${getApiBaseUrl()}/api/approve-route`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      excel_path: excelPath,
      source_dir: sourceDir,
      dest_dir: destPath,
      year: targetYear,
      original_names: originalNames
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(errData => {
        throw new Error(errData.detail || `Server error ${res.status}`);
      }).catch(() => {
        throw new Error(`HTTP error ${res.status}`);
      });
    }
    return res.json();
  });
}

function toggleSelectPendingItem(fileName, forceState) {
  const activeReport = appState.iterationReports ? appState.iterationReports.find(r => r.id === appState.activeReportId) : null;
  if (!activeReport || !activeReport.pendingReviews) return;

  const item = activeReport.pendingReviews.find(r => r.original_name === fileName);
  if (!item) return;

  if (typeof forceState === "boolean") {
    item.selected = forceState;
  } else {
    item.selected = !item.selected;
  }

  saveState();
  renderReportsTable();
}

function toggleSelectAllPending(forceState) {
  const activeReport = appState.iterationReports ? appState.iterationReports.find(r => r.id === appState.activeReportId) : null;
  if (!activeReport || !activeReport.pendingReviews || activeReport.pendingReviews.length === 0) return;

  let targetState;
  if (typeof forceState === "boolean") {
    targetState = forceState;
  } else {
    const allSelected = activeReport.pendingReviews.every(item => item.selected);
    targetState = !allSelected;
  }

  activeReport.pendingReviews.forEach(item => {
    item.selected = targetState;
  });

  saveState();
  renderReportsTable();
}

function exportSelectedTransactions() {
  const activeReport = appState.iterationReports ? appState.iterationReports.find(r => r.id === appState.activeReportId) : null;
  if (!activeReport || !activeReport.pendingReviews || activeReport.pendingReviews.length === 0) {
    triggerToast("No pending transactions to export.");
    return;
  }

  const selectedItems = activeReport.pendingReviews.filter(item => item.selected);
  if (selectedItems.length === 0) {
    triggerToast("Please select at least one transaction to export.");
    return;
  }

  const exportBtn = document.getElementById("export-selected-btn");
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.innerText = "Exporting...";
  }

  triggerToast(`Exporting and routing ${selectedItems.length} selected transaction(s)...`);

  // Group by target year
  const groups = {};
  selectedItems.forEach(item => {
    const year = item.year || activeReport.targetYear;
    if (!groups[year]) groups[year] = [];
    groups[year].push(item.original_name);
  });

  // Call API for each year group in parallel
  const promises = Object.keys(groups).map(year => {
    return approveRouteOnBackend(groups[year], year).then(data => ({
      year,
      data
    }));
  });

  Promise.all(promises)
    .then(results => {
      let totalSuccess = 0;
      let totalFailed = 0;
      let failedNames = [];

      results.forEach(({ year, data }) => {
        if (data.status === "success") {
          // Process successful approvals
          if (data.approved) {
            data.approved.forEach(approvedItem => {
              // Find the item in pendingReviews
              const pendingItem = activeReport.pendingReviews.find(item => item.original_name === approvedItem.original_name);
              const score = pendingItem ? pendingItem.best_score : 100;
              
              // Remove from pendingReviews
              activeReport.pendingReviews = activeReport.pendingReviews.filter(item => item.original_name !== approvedItem.original_name);
              
              // Add to processedTransactions
              if (!activeReport.processedTransactions) activeReport.processedTransactions = [];
              activeReport.processedTransactions.push({
                id: approvedItem.docket,
                original_name: approvedItem.original_name,
                year: year,
                files: approvedItem.files_migrated,
                excel_real_name: approvedItem.excel_real_name,
                confidence_score: score
              });
              
              totalSuccess += 1;
            });
          }

          // Process failed approvals
          if (data.failed) {
            data.failed.forEach(failedItem => {
              totalFailed += 1;
              failedNames.push(failedItem.original_name);
            });
          }
        } else {
          const yearItems = selectedItems.filter(item => (item.year || activeReport.targetYear) === year);
          totalFailed += yearItems.length;
          failedNames.push(...yearItems.map(item => item.original_name));
        }
      });

      // Update metrics
      activeReport.summary.rejected_unmatched = (activeReport.pendingReviews ? activeReport.pendingReviews.length : 0);
      activeReport.summary.successful_matched = (activeReport.processedTransactions ? activeReport.processedTransactions.length : 0);

      saveState();
      renderReportsTable();

      if (totalFailed > 0) {
        triggerToast(`Export complete: ${totalSuccess} transactions routed. ${totalFailed} failed.`);
      } else {
        triggerToast(`Successfully approved and exported ${totalSuccess} selected transaction(s)!`);
      }
    })
    .catch(err => {
      console.error("Error exporting selected transactions:", err);
      triggerToast(`Export error: ${err.message}`);
      renderReportsTable();
    });
}



function closeSuccessModal() {
  const modal = document.getElementById("success-modal-overlay");
  if (modal) modal.style.display = "none";
}

function startNewRun() {
  closeSuccessModal();
  switchTab("dashboard");
}

function viewDetailedReport() {
  closeSuccessModal();
  switchTab("reports");
}

// ================= SCAN FILE DIALOG =================
function openScanDialog() {
  const overlay = document.getElementById("scan-dialog-overlay");
  if (overlay) overlay.style.display = "flex";
}

function closeScanDialog() {
  const overlay = document.getElementById("scan-dialog-overlay");
  if (overlay) overlay.style.display = "none";
  const list = document.getElementById("selected-files-list");
  if (list) list.innerHTML = "";
}

function triggerFileInput() {
  const input = document.getElementById("scan-file-input");
  if (input) input.click();
}

function handleFileSelection(event) {
  const files = event.target.files;
  const list = document.getElementById("selected-files-list");
  if (!list) return;
  list.innerHTML = "";
  for (let i = 0; i < files.length; i++) {
    const item = document.createElement("div");
    item.innerText = `📄 ${files[i].name} (${Math.round(files[i].size / 1024)} KB)`;
    list.appendChild(item);
  }
}

function uploadScanFiles() {
  closeScanDialog();
  triggerToast("Raw documents ingested into processing inbox.");
}

// ================= ANALYTICS VIEWS RENDERER =================
// ================= ANALYTICS VIEWS RENDERER =================
let analyticsSocket = null;
let analyticsReconnectTimer = null;

function updateAnalyticsParentPathDisplay() {
  const parentPathEl = document.getElementById("analytics-parent-path-text");
  if (parentPathEl) {
    const currentDest = appState.dashboardDest || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
    parentPathEl.innerText = currentDest;
    parentPathEl.title = currentDest;
  }
}

function browseAnalyticsDestPath() {
  fetch(`${getApiBaseUrl()}/api/browse-directory`, { method: "POST" })
    .then(res => res.json())
    .then(data => {
      if (data.path) {
        appState.dashboardDest = data.path;
        saveState();
        updateAnalyticsParentPathDisplay();
        triggerToast(`Clean Output Path set to: ${data.path}`);
        renderAnalytics();
      }
    })
    .catch(err => {
      console.error("Browse directory failed:", err);
    });
}

function renderAnalytics() {
  updateAnalyticsParentPathDisplay();
  const destPath = appState.dashboardDest || "";
  const wsUrl = `${getWsBaseUrl()}/api/analytics/ws?dest_dir=${encodeURIComponent(destPath)}`;

  const statusPill = document.getElementById("realtime-status");
  const pulseDot = statusPill ? statusPill.querySelector(".pulse-dot") : null;
  const statusText = statusPill ? statusPill.querySelector("span:not(.pulse-dot)") : null;

  function updateStatus(state) {
    if (!statusPill) return;
    if (state === "connected") {
      statusPill.style.background = "rgba(16, 185, 129, 0.1)";
      statusPill.style.borderColor = "rgba(16, 185, 129, 0.2)";
      statusPill.style.color = "var(--status-green-text)";
      if (pulseDot) {
        pulseDot.style.backgroundColor = "var(--status-green)";
        pulseDot.style.animation = "pulse 1.6s infinite";
      }
      if (statusText) statusText.innerText = "Realtime Connected";
    } else if (state === "connecting") {
      statusPill.style.background = "rgba(245, 158, 11, 0.1)";
      statusPill.style.borderColor = "rgba(245, 158, 11, 0.2)";
      statusPill.style.color = "var(--status-orange-text)";
      if (pulseDot) {
        pulseDot.style.backgroundColor = "var(--status-orange)";
        pulseDot.style.animation = "pulse-connecting 1.6s infinite";
      }
      if (statusText) statusText.innerText = "Connecting...";
    } else {
      statusPill.style.background = "rgba(239, 68, 68, 0.1)";
      statusPill.style.borderColor = "rgba(239, 68, 68, 0.2)";
      statusPill.style.color = "var(--status-red-text)";
      if (pulseDot) {
        pulseDot.style.backgroundColor = "var(--status-red)";
        pulseDot.style.animation = "pulse-offline 1.6s infinite";
      }
      if (statusText) statusText.innerText = "Offline (Loaded)";
    }
  }

  if (analyticsReconnectTimer) {
    clearTimeout(analyticsReconnectTimer);
    analyticsReconnectTimer = null;
  }

  if (analyticsSocket) {
    try {
      analyticsSocket.onclose = null;
      analyticsSocket.onerror = null;
      analyticsSocket.close();
    } catch (e) { }
    analyticsSocket = null;
  }

  const localCache = localStorage.getItem("cached_analytics");
  if (localCache) {
    try {
      const cachedData = JSON.parse(localCache);
      const cachedTotal = Object.values(cachedData.files_processed || {}).reduce((a, b) => a + Number(b || 0), 0);
      if (cachedTotal > 0) {
        updateAnalyticsCharts(cachedData);
      } else {
        updateAnalyticsChartsFallback();
      }
    } catch (e) {
      updateAnalyticsChartsFallback();
    }
  } else {
    updateAnalyticsChartsFallback();
  }

  fetch(`${getApiBaseUrl()}/api/analytics?dest_dir=${encodeURIComponent(destPath)}`)
    .then(res => res.json())
    .then(data => {
      updateAnalyticsCharts(data);
    })
    .catch(() => { });

  updateStatus("connecting");

  function connectSocket() {
    if (appState.currentView !== "analytics") return;
    try {
      analyticsSocket = new WebSocket(wsUrl);

      analyticsSocket.onopen = () => {
        console.log("WebSocket connected to", wsUrl);
        updateStatus("connected");
      };

      analyticsSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          updateAnalyticsCharts(data);
        } catch (err) {
          console.error("Error parsing realtime analytics payload:", err);
        }
      };

      analyticsSocket.onclose = (event) => {
        console.log("WebSocket connection closed:", event ? event.reason : "");
        updateStatus("offline");
        analyticsSocket = null;

        if (appState.currentView === "analytics") {
          analyticsReconnectTimer = setTimeout(() => {
            if (appState.currentView === "analytics" && !analyticsSocket) {
              connectSocket();
            }
          }, 5000);
        }
      };

      analyticsSocket.onerror = (err) => {
        console.error("WebSocket encountered error:", err);
        updateStatus("offline");
      };
    } catch (error) {
      console.error("Failed to initialize WebSocket connection:", error);
      updateStatus("offline");
    }
  }

  connectSocket();
}

function updateAnalyticsCharts(data) {
  if (!data) {
    updateAnalyticsChartsFallback();
    return;
  }

  const totalFiles = Object.values(data.files_processed || {}).reduce((a, b) => a + Number(b || 0), 0);

  if (totalFiles === 0) {
    const localCache = localStorage.getItem("cached_analytics");
    if (localCache) {
      try {
        const cachedData = JSON.parse(localCache);
        const cachedTotal = Object.values(cachedData.files_processed || {}).reduce((a, b) => a + Number(b || 0), 0);
        if (cachedTotal > 0) {
          data = cachedData;
        } else {
          updateAnalyticsChartsFallback();
          return;
        }
      } catch (e) {
        updateAnalyticsChartsFallback();
        return;
      }
    } else {
      updateAnalyticsChartsFallback();
      return;
    }
  } else {
    localStorage.setItem("cached_analytics", JSON.stringify(data));
  }

  const dataYearsSet = new Set([
    ...(appState.SYSTEM_YEARS || []),
    ...Object.keys(data.files_processed || {}).map(y => y.replace(/^FY\s*/i, "")),
    ...Object.keys(data.duplicates || {}).map(y => y.replace(/^FY\s*/i, "")),
    ...Object.keys(data.revisions || {}).map(y => y.replace(/^FY\s*/i, "")),
    ...Object.keys(data.storage || {}).map(y => y.replace(/^FY\s*/i, ""))
  ]);

  const sortedYears = Array.from(dataYearsSet)
    .filter(y => y && typeof y === "string" && y.trim().length > 0)
    .sort();

  if (sortedYears.length > 0 && JSON.stringify(sortedYears) !== JSON.stringify(appState.SYSTEM_YEARS)) {
    appState.SYSTEM_YEARS = sortedYears;
    saveState();
  }

  const yearsToRender = appState.SYSTEM_YEARS && appState.SYSTEM_YEARS.length > 0 ? appState.SYSTEM_YEARS : sortedYears;

  const getVal = (obj, yr) => {
    if (!obj) return 0;
    if (obj[yr] !== undefined && obj[yr] !== null) return Number(obj[yr]) || 0;
    if (obj["FY " + yr] !== undefined && obj["FY " + yr] !== null) return Number(obj["FY " + yr]) || 0;
    const cleanYr = yr.replace(/^FY\s*/i, "");
    if (obj[cleanYr] !== undefined && obj[cleanYr] !== null) return Number(obj[cleanYr]) || 0;
    return 0;
  };

  // Chart 1: Files Processed by Year
  const filesProcessedEl = document.getElementById("chart-files-processed");
  if (filesProcessedEl) {
    filesProcessedEl.innerHTML = "";
    const values = yearsToRender.map(yr => getVal(data.files_processed, yr));
    const maxFiles = Math.max(...values, 100);
    yearsToRender.forEach(yr => {
      const filesCount = getVal(data.files_processed, yr);
      const pct = Math.round((filesCount / maxFiles) * 100);
      filesProcessedEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${filesCount.toLocaleString()} files</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%;"></div></div>
        </div>
      `;
    });
  }

  // Chart 2: Duplicates by Year
  const dupsEl = document.getElementById("chart-duplicates-year");
  if (dupsEl) {
    dupsEl.innerHTML = "";
    const values = yearsToRender.map(yr => getVal(data.duplicates, yr));
    const maxDups = Math.max(...values, 50);
    yearsToRender.forEach(yr => {
      const count = getVal(data.duplicates, yr);
      const pct = Math.round((count / maxDups) * 100);
      dupsEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${count} duplicates</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--status-orange);"></div></div>
        </div>
      `;
    });
  }

  // Chart 3: Revisions by Year
  const revsEl = document.getElementById("chart-revisions-year");
  if (revsEl) {
    revsEl.innerHTML = "";
    const values = yearsToRender.map(yr => getVal(data.revisions, yr));
    const maxRevs = Math.max(...values, 50);
    yearsToRender.forEach(yr => {
      const count = getVal(data.revisions, yr);
      const pct = Math.round((count / maxRevs) * 100);
      revsEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${count} revisions</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--status-green);"></div></div>
        </div>
      `;
    });
  }

  // Chart 4: Storage Growth
  const growthEl = document.getElementById("chart-storage-growth");
  if (growthEl) {
    growthEl.innerHTML = "";
    const values = yearsToRender.map(yr => getVal(data.storage, yr));
    const maxStorage = Math.max(...values, 1.0);
    yearsToRender.forEach(yr => {
      const totalGB = getVal(data.storage, yr);
      const pct = Math.round((totalGB / maxStorage) * 100);
      growthEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${totalGB.toFixed(2)} GB</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--text-muted);"></div></div>
        </div>
      `;
    });
  }

  // Chart 5: Docket Distribution
  const distEl = document.getElementById("chart-docket-distribution");
  if (distEl) {
    const classes = data.classes || {};
    const lit = classes.litigation || 0;
    const corp = classes.corporate || 0;
    const aud = classes.audit || 0;
    const total = lit + corp + aud;

    let litPct = 0, corpPct = 0, audPct = 0;
    if (total > 0) {
      litPct = Math.round((lit / total) * 100);
      corpPct = Math.round((corp / total) * 100);
      audPct = Math.round((aud / total) * 100);

      const sum = litPct + corpPct + audPct;
      if (sum !== 100 && sum > 0) {
        corpPct += (100 - sum);
      }
    } else {
      litPct = 40;
      corpPct = 35;
      audPct = 25;
    }

    distEl.innerHTML = `
      <div style="font-size: 11px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between;"><span>Litigation Dockets:</span> <strong>${litPct}%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: ${litPct}%; height: 6px;"></div></div>
        <div style="display: flex; justify-content: space-between;"><span>Corporate M&amp;A:</span> <strong>${corpPct}%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: ${corpPct}%; height: 6px; background-color: var(--status-green);"></div></div>
        <div style="display: flex; justify-content: space-between;"><span>Financial Audits:</span> <strong>${audPct}%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: ${audPct}%; height: 6px; background-color: var(--status-orange);"></div></div>
      </div>
    `;
  }

  // Chart 6: Success vs Failed Matches
  const successEl = document.getElementById("chart-match-success");
  if (successEl) {
    const accuracy = data.accuracy || 98.4;
    const errorPct = (100 - accuracy).toFixed(1);
    successEl.innerHTML = `
      <div style="font-size: 11px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Automatic Match Accuracy:</span>
          <span style="font-weight: 700; color: var(--status-green-text);">${accuracy}%</span>
        </div>
        <div style="display: flex; height: 12px; border-radius: 6px; overflow: hidden; background-color: var(--status-red-bg);">
          <div style="width: ${accuracy}%; background-color: var(--status-green); height: 100%;"></div>
          <div style="width: ${errorPct}%; background-color: var(--status-red); height: 100%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 4px;">
          <span>${accuracy}% Success</span>
          <span>${errorPct}% Errors/Failed</span>
        </div>
      </div>
    `;
  }
}

function updateAnalyticsChartsFallback() {
  // Chart 1: Files Processed by Year (Mock)
  const filesProcessedEl = document.getElementById("chart-files-processed");
  if (filesProcessedEl) {
    filesProcessedEl.innerHTML = "";
    appState.SYSTEM_YEARS.forEach((yr, index) => {
      const multiplier = 1 + (index * 0.15);
      const filesCount = Math.round(1024 * multiplier);
      const pct = Math.round((filesCount / 2500) * 100);

      filesProcessedEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${filesCount.toLocaleString()} files</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%;"></div></div>
        </div>
      `;
    });
  }

  // Chart 2: Duplicates by Year (Mock)
  const dupsEl = document.getElementById("chart-duplicates-year");
  if (dupsEl) {
    dupsEl.innerHTML = "";
    appState.SYSTEM_YEARS.forEach((yr, index) => {
      const count = Math.round(45 + (index * 15 * (index % 2 === 0 ? 1 : -0.5)));
      const pct = Math.round((count / 150) * 100);
      dupsEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${count} duplicates</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--status-orange);"></div></div>
        </div>
      `;
    });
  }

  // Chart 3: Revisions by Year (Mock)
  const revsEl = document.getElementById("chart-revisions-year");
  if (revsEl) {
    revsEl.innerHTML = "";
    appState.SYSTEM_YEARS.forEach((yr, index) => {
      const count = Math.round(15 + (index * 22));
      const pct = Math.round((count / 200) * 100);
      revsEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${count} revisions</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--status-green);"></div></div>
        </div>
      `;
    });
  }

  // Chart 4: Storage Growth (Mock)
  const growthEl = document.getElementById("chart-storage-growth");
  if (growthEl) {
    growthEl.innerHTML = "";
    let totalGB = 0.5;
    appState.SYSTEM_YEARS.forEach((yr, index) => {
      totalGB += 0.4 + (index * 0.12);
      const pct = Math.round((totalGB / 6.0) * 100);
      growthEl.innerHTML += `
        <div class="analytics-bar-row">
          <div class="analytics-bar-label">
            <span>FY ${yr}</span>
            <span class="mono">${totalGB.toFixed(1)} GB</span>
          </div>
          <div class="analytics-bar-bg"><div class="analytics-bar-fill" style="width: ${pct}%; background-color: var(--text-muted);"></div></div>
        </div>
      `;
    });
  }

  // Chart 5: Docket Distribution (Mock)
  const distEl = document.getElementById("chart-docket-distribution");
  if (distEl) {
    distEl.innerHTML = `
      <div style="font-size: 11px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between;"><span>Litigation Dockets:</span> <strong>40%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: 40%; height: 6px;"></div></div>
        <div style="display: flex; justify-content: space-between;"><span>Corporate M&amp;A:</span> <strong>35%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: 35%; height: 6px; background-color: var(--status-green);"></div></div>
        <div style="display: flex; justify-content: space-between;"><span>Financial Audits:</span> <strong>25%</strong></div>
        <div class="analytics-bar-bg" style="height: 6px;"><div class="analytics-bar-fill" style="width: 25%; height: 6px; background-color: var(--status-orange);"></div></div>
      </div>
    `;
  }

  // Chart 6: Success vs Failed Matches (Mock)
  const successEl = document.getElementById("chart-match-success");
  if (successEl) {
    successEl.innerHTML = `
      <div style="font-size: 11px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Automatic Match Accuracy:</span>
          <span style="font-weight: 700; color: var(--status-green-text);">98.4%</span>
        </div>
        <div style="display: flex; height: 12px; border-radius: 6px; overflow: hidden; background-color: var(--status-red-bg);">
          <div style="width: 98.4%; background-color: var(--status-green); height: 100%;"></div>
          <div style="width: 1.6%; background-color: var(--status-red); height: 100%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 4px;">
          <span>98.4% Success</span>
          <span>1.6% Errors/Failed</span>
        </div>
      </div>
    `;
  }
}

// ================= GLOBAL SEARCH PALETTE =================
function openGlobalSearch() {
  const overlay = document.getElementById("global-search-overlay");
  if (overlay) overlay.style.display = "flex";

  const input = document.getElementById("global-search-input");
  if (input) {
    input.value = "";
    input.focus();
  }

  renderGlobalSearchResults("");
}

function closeGlobalSearch() {
  const overlay = document.getElementById("global-search-overlay");
  if (overlay) overlay.style.display = "none";
}

function handleGlobalSearch(event) {
  const query = event.target.value.trim();
  renderGlobalSearchResults(query);
}

function renderGlobalSearchResults(query) {
  const container = document.getElementById("global-search-results");
  if (!container) return;
  container.innerHTML = "";

  if (!query) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 11px;">
        Type query to search Years, Dockets, Party Names, Folders, and Files...
      </div>
    `;
    return;
  }

  const q = query.toLowerCase();
  let html = "";

  // 1. Search Years
  const matchYears = appState.SYSTEM_YEARS.filter(y => y.includes(q));
  if (matchYears.length > 0) {
    html += `<div class="global-search-category">Financial Years</div>`;
    matchYears.forEach(y => {
      html += `
        <div class="global-search-item" onclick="triggerGlobalSearchNavigate('year', '${y}')">
          <span>FY ${y}</span>
          <span class="mono text-muted" style="font-size: 10px;">Partition Root</span>
        </div>
      `;
    });
  }

  // 2. Search Dockets
  const matchDockets = DOCKET_DB.filter(d => d.id.toLowerCase().includes(q) || d.name.toLowerCase().includes(q));
  if (matchDockets.length > 0) {
    html += `<div class="global-search-category">Dockets</div>`;
    matchDockets.forEach(d => {
      html += `
        <div class="global-search-item" onclick="triggerGlobalSearchNavigate('docket', '${d.id}', '${d.years[0].replace('FY ', '')}')">
          <span style="font-weight: 600;">${d.id}</span>
          <span class="text-secondary" style="font-size: 11px;">${d.name}</span>
        </div>
      `;
    });
  }

  // 3. Search Folders & Files
  let matchFiles = [];
  let matchFolders = [];

  DOCKET_DB.forEach(d => {
    const yr = d.years[0].replace("FY ", "");
    d.tree.forEach(node => {
      if (node.name.toLowerCase().includes(q)) {
        if (node.type === "file") {
          matchFiles.push({ name: node.name, docketId: d.id, year: yr });
        } else {
          matchFolders.push({ name: node.name, docketId: d.id, year: yr });
        }
      }
    });
  });

  if (matchFolders.length > 0) {
    html += `<div class="global-search-category">Folders</div>`;
    matchFolders.slice(0, 5).forEach(f => {
      html += `
        <div class="global-search-item" onclick="triggerGlobalSearchNavigate('docket', '${f.docketId}', '${f.year}')">
          <span class="mono">📂 ${f.name}</span>
          <span class="mono text-muted" style="font-size: 10px;">in ${f.docketId}</span>
        </div>
      `;
    });
  }

  if (matchFiles.length > 0) {
    html += `<div class="global-search-category">Files</div>`;
    matchFiles.slice(0, 8).forEach(f => {
      html += `
        <div class="global-search-item" onclick="triggerGlobalSearchNavigate('docket', '${f.docketId}', '${f.year}')">
          <span class="mono">📄 ${f.name}</span>
          <span class="mono text-muted" style="font-size: 10px;">in ${f.docketId}</span>
        </div>
      `;
    });
  }

  if (!html) {
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 11px;">
        No results matched "${query}"
      </div>
    `;
  } else {
    container.innerHTML = html;
  }
}

function triggerGlobalSearchNavigate(type, value, yearVal) {
  closeGlobalSearch();
  if (type === "year") {
    appState.selectedExplorerYear = value;
    switchTab("finder");
  } else if (type === "docket") {
    appState.selectedExplorerYear = yearVal;
    appState.activeTreeDockets[value] = true;
    saveState();

    // Redirect if we are not on explorer.html
    const explorerPage = "explorer.html";
    if (!window.location.pathname.endsWith(explorerPage)) {
      window.location.href = explorerPage;
    } else {
      // Already on explorer.html, select the year and highlight
      selectExplorerYear(yearVal);
      setTimeout(() => {
        const docketCard = document.getElementById(`tree-${value}`).parentElement;
        if (docketCard) {
          docketCard.scrollIntoView({ behavior: "smooth" });
          docketCard.style.outline = "2px solid var(--accent-yellow)";
          setTimeout(() => {
            docketCard.style.outline = "none";
          }, 1500);
        }
      }, 400);
    }
  }
}

// ================= PATH BROWSE LOCAL DEVICE ENGINE =================
function browseLocalPath(inputId) {
  const port = appState.port || "8001";
  const isFile = (inputId === "input-master-excel");
  const endpoint = isFile ? "browse-file" : "browse-directory";

  triggerToast(isFile ? "Opening file selector..." : "Opening folder selector...");

  fetch(`http://localhost:${port}/api/${endpoint}`, {
    method: "POST"
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to open browser dialog");
      return res.json();
    })
    .then(data => {
      if (data.path) {
        const input = document.getElementById(inputId);
        if (input) {
          input.value = data.path;

          // Update state
          if (inputId === "input-master-excel") appState.dashboardExcel = data.path;
          else if (inputId === "input-source-dirs") appState.dashboardSource = data.path;
          else if (inputId === "input-dest-path") {
            appState.dashboardDest = data.path;
            fetchSystemCapacity(data.path);
          }

          saveState();
          triggerToast("Selected: " + data.path);
        }
      } else {
        triggerToast("Selection cancelled");
      }
    })
    .catch(err => {
      console.error(err);
      triggerToast("Error browsing local device: " + err.message);
    });
}

function browseReportsDirectory() {
  const port = appState.port || "8001";
  triggerToast("Opening folder selector for Reports Storage Path...");

  fetch(`http://localhost:${port}/api/browse-directory`, {
    method: "POST"
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to open browser dialog");
      return res.json();
    })
    .then(data => {
      if (data.path) {
        appState.dashboardReportsDir = data.path;
        saveState();
        updateReportsPathUI();
        fetchReportsFromDisk();
        persistReportsToDisk();
        triggerToast("Selected Reports storage path: " + data.path);
      } else {
        triggerToast("Selection cancelled");
      }
    })
    .catch(err => {
      console.error(err);
      promptChangeReportsPath();
    });
}

function fetchSystemCapacity(destPath) {
  const targetPath = destPath || appState.dashboardDest || "C:\\Users\\sneha\\Desktop\\Test_Sandbox\\Clean_Output";
  const port = appState.port || "8001";
  const url = `http://localhost:${port}/api/system-capacity?path=${encodeURIComponent(targetPath)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === "success") {
        const valEl = document.getElementById("capacity-value");
        const subEl = document.getElementById("capacity-sub");
        const fillEl = document.getElementById("capacity-progress-fill");
        const headerEl = document.getElementById("capacity-header");

        if (headerEl) {
          headerEl.innerText = data.drive ? `System Capacity (${data.drive})` : "System Capacity";
        }
        if (valEl) {
          valEl.innerText = data.free_formatted;
        }
        if (subEl) {
          subEl.innerText = data.sub_text || `Available Space on Drive (${data.free_formatted} free / ${data.total_formatted} total)`;
        }
        if (fillEl) {
          fillEl.style.width = `${data.percent_used}%`;
          if (data.percent_used > 85) {
            fillEl.style.backgroundColor = "var(--status-red, #ff4d4f)";
          } else {
            fillEl.style.backgroundColor = "var(--accent-yellow, #eab308)";
          }
        }
      }
    })
    .catch(err => {
      console.warn("Could not fetch system capacity:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  updateReportsPathUI();
  fetchReportsFromDisk();
});
