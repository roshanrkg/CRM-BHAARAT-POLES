/**
 * SAH ENTERPRISE - Quotation Generator Application Logic
 * Pure Client-Side JavaScript (Zero Backend Required)
 */

(function () {
    'use strict';

    // Application State Object
    const state = {
        sellerName: 'SAH ENTERPRISE',
        sellerAddr1: 'Holding no. 303, R.K. Roy Road Vivekananda Pally,',
        sellerAddr2: 'Ismile. Asansol- 713301',
        sellerGst: '19FMLPS0625H1ZO',
        sellerPhone: '9832713026/9064441273',
        sellerEmail: 'bhaarat.poles@gmail.com',

        invoiceNo: 'QN-23/26-27',
        invoiceDate: '26/07/2026',
        deliveryNote: '',
        modeOfPayment: '',
        buyerOrderNo: '',
        buyerOrderDate: '',
        dispatchDocNo: '',
        dispatchDocDate: '',
        dispatchThrough: 'Roadways/Logistics',
        destination: 'Dhanbad, Jharkhand.',
        termsOfDelivery: '',
        
        buyerName: 'Samay Homes Pvt. Ltd.',
        buyerAddress1: 'Beside Zudio showroom, Adityapur',
        buyerAddress2: 'Kandra Main Road, Jamshedpur.',
        buyerStatePin: 'Jharkhand- 831013',
        
        taxMode: 'igst18', // igst18 | cgst_sgst9 | exempt | custom
        customTaxRate: 18,
        transportationFee: 0,
        
        items: [
            {
                id: 1,
                sl: 1,
                desc: '3m Designer Garden Light Pole. J-Shaped Double arm with base plate measuring 200x200x8mm. Bottom pipe dia: 4.5inch and 1m long, Top pipe dia: 3inch and 2m long. Thickness 2.5mm. Black and golden coloured arms and flowers welded in the J section.',
                hsn: '7308',
                qtyNum: 6,
                unit: 'pcs',
                rate: 4800
            },
            {
                id: 2,
                sl: 2,
                desc: 'M16 Foundation Bolts (Set of 4)',
                hsn: '7318',
                qtyNum: 6,
                unit: 'sets',
                rate: 580
            }
        ],
        
        remark1: '50% payment as advance and 100% payment before material dispatch.',
        remark2: 'Transportation as per actual. Borne by the buyer.',
        
        bankName: 'Punjab National Bank.',
        bankAccount: '1397202100001251',
        bankBranchIfsc: 'SB Gorai Road Branch',
        bankIfscCode: 'PUNB0139720'
    };

    // Preset Catalog Database
    const PRESETS = {
        preset_1: {
            desc: '3m Designer Garden Light Pole. J-Shaped Double arm with base plate measuring 200x200x8mm. Bottom pipe dia: 4.5inch and 1m long, Top pipe dia: 3inch and 2m long. Thickness 2.5mm. Black and golden coloured arms and flowers welded in the J section.',
            hsn: '7308',
            qtyNum: 6,
            unit: 'pcs',
            rate: 4800
        },
        preset_2: {
            desc: 'M16 Foundation Bolts (Set of 4)',
            hsn: '7318',
            qtyNum: 6,
            unit: 'sets',
            rate: 580
        },
        preset_3: {
            desc: '6m Octagonal Steel Pole with Base Plate (200x200x12mm), Top Dia 70mm, Bottom Dia 130mm, 3mm Thickness.',
            hsn: '7308',
            qtyNum: 10,
            unit: 'pcs',
            rate: 9500
        },
        preset_4: {
            desc: '9m Swaged Tubular Steel Pole (SP-33 Type) with Base Plate measuring 300x300x16mm.',
            hsn: '7308',
            qtyNum: 5,
            unit: 'pcs',
            rate: 12800
        },
        preset_5: {
            desc: 'LED Street Light Single Arm Pipe Bracket (50mm Dia, 1.5m Length) with Mounting Clamp Set.',
            hsn: '7308',
            qtyNum: 10,
            unit: 'pcs',
            rate: 1450
        }
    };

    // DOM Elements Cache
    const el = {
        sellerName: document.getElementById('sellerName'),
        sellerAddr1: document.getElementById('sellerAddr1'),
        sellerAddr2: document.getElementById('sellerAddr2'),
        sellerGst: document.getElementById('sellerGst'),
        sellerPhone: document.getElementById('sellerPhone'),
        sellerEmail: document.getElementById('sellerEmail'),

        invoiceNo: document.getElementById('invoiceNo'),
        invoiceDate: document.getElementById('invoiceDate'),
        deliveryNote: document.getElementById('deliveryNote'),
        modeOfPayment: document.getElementById('modeOfPayment'),
        buyerOrderNo: document.getElementById('buyerOrderNo'),
        buyerOrderDate: document.getElementById('buyerOrderDate'),
        dispatchDocNo: document.getElementById('dispatchDocNo'),
        dispatchDocDate: document.getElementById('dispatchDocDate'),
        dispatchThrough: document.getElementById('dispatchThrough'),
        destination: document.getElementById('destination'),
        termsOfDelivery: document.getElementById('termsOfDelivery'),
        
        buyerName: document.getElementById('buyerName'),
        buyerAddress1: document.getElementById('buyerAddress1'),
        buyerAddress2: document.getElementById('buyerAddress2'),
        buyerStatePin: document.getElementById('buyerStatePin'),
        
        itemsContainer: document.getElementById('itemsContainer'),
        btnAddItem: document.getElementById('btnAddItem'),
        presetSelect: document.getElementById('presetSelect'),
        btnAddPreset: document.getElementById('btnAddPreset'),
        
        taxMode: document.getElementById('taxMode'),
        customTaxRow: document.getElementById('customTaxRow'),
        customTaxRate: document.getElementById('customTaxRate'),
        transportationFee: document.getElementById('transportationFee'),
        
        remark1: document.getElementById('remark1'),
        remark2: document.getElementById('remark2'),
        bankName: document.getElementById('bankName'),
        bankAccount: document.getElementById('bankAccount'),
        bankBranchIfsc: document.getElementById('bankBranchIfsc'),
        bankIfscCode: document.getElementById('bankIfscCode'),
        
        // View Target Elements
        viewInvoiceNo: document.getElementById('viewInvoiceNo'),
        viewInvoiceDate: document.getElementById('viewInvoiceDate'),
        viewDeliveryNote: document.getElementById('viewDeliveryNote'),
        viewModeOfPayment: document.getElementById('viewModeOfPayment'),
        viewBuyerOrderNo: document.getElementById('viewBuyerOrderNo'),
        viewBuyerOrderDate: document.getElementById('viewBuyerOrderDate'),
        viewDispatchDocNo: document.getElementById('viewDispatchDocNo'),
        viewDispatchDocDate: document.getElementById('viewDispatchDocDate'),
        viewDispatchThrough: document.getElementById('viewDispatchThrough'),
        viewDestination: document.getElementById('viewDestination'),
        viewTermsOfDelivery: document.getElementById('viewTermsOfDelivery'),
        
        viewBuyerName: document.getElementById('viewBuyerName'),
        viewBuyerAddr1: document.getElementById('viewBuyerAddr1'),
        viewBuyerAddr2: document.getElementById('viewBuyerAddr2'),
        viewBuyerStatePin: document.getElementById('viewBuyerStatePin'),
        
        viewItemsTableBody: document.getElementById('viewItemsTableBody'),
        viewSubtotal: document.getElementById('viewSubtotal'),
        rowCgst: document.getElementById('rowCgst'),
        viewCgst: document.getElementById('viewCgst'),
        rowSgst: document.getElementById('rowSgst'),
        viewSgst: document.getElementById('viewSgst'),
        rowIgst: document.getElementById('rowIgst'),
        viewIgst: document.getElementById('viewIgst'),
        rowTransportation: document.getElementById('rowTransportation'),
        viewTransportation: document.getElementById('viewTransportation'),
        viewGrandTotal: document.getElementById('viewGrandTotal'),
        viewAmountInWords: document.getElementById('viewAmountInWords'),
        
        viewRemarksList: document.getElementById('viewRemarksList'),
        viewBankName: document.getElementById('viewBankName'),
        viewBankAccount: document.getElementById('viewBankAccount'),
        viewBankBranchIfsc: document.getElementById('viewBankBranchIfsc'),
        viewBankIfscCode: document.getElementById('viewBankIfscCode'),
        
        // Top Action Buttons
        btnLoadSample: document.getElementById('btnLoadSample'),
        btnReset: document.getElementById('btnReset'),
        btnHistory: document.getElementById('btnHistory'),
        historyCount: document.getElementById('historyCount'),
        btnPrintPdf: document.getElementById('btnPrintPdf'),
        btnExportDocx: document.getElementById('btnExportDocx'),
        
        // Modal
        historyModal: document.getElementById('historyModal'),
        btnCloseHistory: document.getElementById('btnCloseHistory'),
        btnClearHistory: document.getElementById('btnClearHistory'),
        historyList: document.getElementById('historyList')
    };

    // Helper: Format Number as Indian Currency Rupees
    function formatRupees(num) {
        if (num === null || num === undefined || isNaN(num)) return '₹0.00';
        return '₹' + Number(num).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Helper: Indian Currency Number to Words Converter
    function numberToWordsINR(amount) {
        const num = Math.floor(Math.abs(Number(amount) || 0));
        if (num === 0) return 'Rupees Zero Only.';

        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                       'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        function convertGroup(n) {
            let str = '';
            if (n >= 100) {
                str += units[Math.floor(n / 100)] + ' Hundred ';
                n %= 100;
            }
            if (n >= 20) {
                str += tens[Math.floor(n / 10)] + ' ';
                n %= 10;
            }
            if (n > 0) {
                str += units[n] + ' ';
            }
            return str;
        }

        let words = '';
        const crore = Math.floor(num / 10000000);
        let rem = num % 10000000;
        const lakh = Math.floor(rem / 100000);
        rem %= 100000;
        const thousand = Math.floor(rem / 1000);
        rem %= 1000;

        if (crore > 0) words += convertGroup(crore) + 'Crore ';
        if (lakh > 0) words += convertGroup(lakh) + 'Lakh ';
        if (thousand > 0) words += convertGroup(thousand) + 'Thousand ';
        if (rem > 0) words += convertGroup(rem);

        words = words.trim();
        // Capitalize words properly
        return 'Rupees ' + words + ' Only.';
    }

    // Initialize App & Event Listeners
    function init() {
        bindFormInputs();
        renderItemsEditor();
        updateView();
        updateHistoryCount();
        initMobileTabs();
        lucide.createIcons();
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.scrollTop = 0;
    }

    // Mobile View Tab Switcher Logic
    function initMobileTabs() {
        const tabEditor = document.getElementById('tabEditor');
        const tabPreview = document.getElementById('tabPreview');
        const sidebar = document.querySelector('.sidebar');
        const previewViewport = document.querySelector('.preview-viewport');

        if (!tabEditor || !tabPreview || !sidebar || !previewViewport) return;

        tabEditor.addEventListener('click', () => {
            tabEditor.classList.add('active');
            tabPreview.classList.remove('active');
            sidebar.style.display = 'flex';
            previewViewport.style.display = 'none';
        });

        tabPreview.addEventListener('click', () => {
            tabPreview.classList.add('active');
            tabEditor.classList.remove('active');
            sidebar.style.display = 'none';
            previewViewport.style.display = 'flex';
            setTimeout(updateMobileScale, 50);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                sidebar.style.display = '';
                previewViewport.style.display = '';
            } else {
                if (tabEditor.classList.contains('active')) {
                    sidebar.style.display = 'flex';
                    previewViewport.style.display = 'none';
                } else {
                    sidebar.style.display = 'none';
                    previewViewport.style.display = 'flex';
                }
            }
            updateMobileScale();
        });

        // Trigger initial responsive check
        if (window.innerWidth <= 900) {
            sidebar.style.display = 'flex';
            previewViewport.style.display = 'none';
        }
        updateMobileScale();
    }

    // Dynamic Mobile Preview Sheet Scaling Engine
    function updateMobileScale() {
        const wrapper = document.querySelector('.sheet-wrapper');
        const viewport = document.querySelector('.preview-viewport');
        if (!wrapper || !viewport) return;

        if (window.innerWidth <= 900 && previewViewport.offsetWidth > 0) {
            wrapper.style.transform = 'none';
            const availableWidth = viewport.clientWidth - 24;
            const sheetWidth = wrapper.offsetWidth || 794;

            if (availableWidth < sheetWidth && availableWidth > 200) {
                const scale = availableWidth / sheetWidth;
                wrapper.style.transform = `scale(${scale})`;
                wrapper.style.transformOrigin = 'top left';
                wrapper.style.marginBottom = `-${(1 - scale) * wrapper.offsetHeight}px`;
                wrapper.style.marginRight = `-${(1 - scale) * sheetWidth}px`;
            } else {
                wrapper.style.transform = '';
                wrapper.style.transformOrigin = '';
                wrapper.style.marginBottom = '';
                wrapper.style.marginRight = '';
            }
        } else {
            wrapper.style.transform = '';
            wrapper.style.transformOrigin = '';
            wrapper.style.marginBottom = '';
            wrapper.style.marginRight = '';
        }
    }

    // Date formatting helper (YYYY-MM-DD -> DD/MM/YYYY)
    function formatDateDisplay(dateStr) {
        if (!dateStr) return '';
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                return `${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
        return dateStr;
    }

    // Date picker input value converter (DD/MM/YYYY -> YYYY-MM-DD)
    function formatDatePickerVal(dateStr) {
        if (!dateStr) return '';
        if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
        }
        return dateStr;
    }

    // Bind basic text & date inputs to state & live update
    function bindFormInputs() {
        const fieldMap = [
            ['sellerName', 'viewSellerName'],
            ['sellerAddr1', 'viewSellerAddr1'],
            ['sellerAddr2', 'viewSellerAddr2'],
            ['sellerGst', 'viewGstNo'],
            ['sellerPhone', 'viewSellerPhone'],
            ['sellerEmail', 'viewSellerEmail'],
            ['invoiceNo', 'viewInvoiceNo'],
            ['deliveryNote', 'viewDeliveryNote'],
            ['modeOfPayment', 'viewModeOfPayment'],
            ['buyerOrderNo', 'viewBuyerOrderNo'],
            ['dispatchDocNo', 'viewDispatchDocNo'],
            ['dispatchThrough', 'viewDispatchThrough'],
            ['destination', 'viewDestination'],
            ['termsOfDelivery', 'viewTermsOfDelivery'],
            ['buyerName', 'viewBuyerName'],
            ['buyerAddress1', 'viewBuyerAddr1'],
            ['buyerAddress2', 'viewBuyerAddr2'],
            ['buyerStatePin', 'viewBuyerStatePin'],
            ['bankName', 'viewBankName'],
            ['bankAccount', 'viewBankAccount'],
            ['bankBranchIfsc', 'viewBankBranchIfsc'],
            ['bankIfscCode', 'viewBankIfscCode']
        ];

        fieldMap.forEach(([inputId, viewId]) => {
            if (el[inputId]) {
                el[inputId].addEventListener('input', (e) => {
                    state[inputId] = e.target.value;
                    if (el[viewId]) el[viewId].textContent = e.target.value;
                });
            }
        });

        // Specific Date Picker Field Bindings (invoiceDate, buyerOrderDate, dispatchDocDate)
        const dateFields = [
            ['invoiceDate', 'viewInvoiceDate'],
            ['buyerOrderDate', 'viewBuyerOrderDate'],
            ['dispatchDocDate', 'viewDispatchDocDate']
        ];

        dateFields.forEach(([inputId, viewId]) => {
            if (el[inputId]) {
                // Pre-populate input value
                el[inputId].value = formatDatePickerVal(state[inputId]);

                const handleDateChange = (e) => {
                    const rawVal = e.target.value;
                    const formatted = formatDateDisplay(rawVal);
                    state[inputId] = formatted;
                    if (el[viewId]) el[viewId].textContent = formatted;
                };

                el[inputId].addEventListener('input', handleDateChange);
                el[inputId].addEventListener('change', handleDateChange);
            }
        });

        // Tax Mode Switcher
        el.taxMode.addEventListener('change', (e) => {
            state.taxMode = e.target.value;
            if (state.taxMode === 'custom') {
                el.customTaxRow.classList.remove('hidden');
            } else {
                el.customTaxRow.classList.add('hidden');
            }
            updateView();
        });

        el.customTaxRate.addEventListener('input', (e) => {
            state.customTaxRate = parseFloat(e.target.value) || 0;
            updateView();
        });

        if (el.transportationFee) {
            el.transportationFee.addEventListener('input', (e) => {
                state.transportationFee = e.target.value;
                updateView();
            });
        }

        // Remarks Inputs
        el.remark1.addEventListener('input', (e) => {
            state.remark1 = e.target.value;
            renderRemarks();
        });
        el.remark2.addEventListener('input', (e) => {
            state.remark2 = e.target.value;
            renderRemarks();
        });

        // Preset Inserter
        el.btnAddPreset.addEventListener('click', () => {
            const key = el.presetSelect.value;
            if (!key || !PRESETS[key]) return;
            const itemPreset = PRESETS[key];
            state.items.push({
                id: Date.now(),
                sl: state.items.length + 1,
                desc: itemPreset.desc,
                hsn: itemPreset.hsn,
                qtyNum: itemPreset.qtyNum,
                unit: itemPreset.unit,
                rate: itemPreset.rate
            });
            renderItemsEditor();
            updateView();
        });

        // Add Custom Item Row
        el.btnAddItem.addEventListener('click', () => {
            state.items.push({
                id: Date.now(),
                sl: state.items.length + 1,
                desc: 'New Pole / Product Description',
                hsn: '7308',
                qtyNum: 1,
                unit: 'pcs',
                rate: 1000
            });
            renderItemsEditor();
            updateView();
        });

        // Action Toolbar Buttons
        el.btnLoadSample.addEventListener('click', loadSampleData);
        el.btnReset.addEventListener('click', resetForm);
        el.btnPrintPdf.addEventListener('click', triggerPrintPdf);
        el.btnExportDocx.addEventListener('click', exportDocxFile);
        
        // History Modal Triggers
        el.btnHistory.addEventListener('click', openHistoryModal);
        el.btnCloseHistory.addEventListener('click', closeHistoryModal);
        el.btnClearHistory.addEventListener('click', clearHistory);
    }

    // Render Form Line Item Editor Cards
    function renderItemsEditor() {
        el.itemsContainer.innerHTML = '';
        state.items.forEach((item, index) => {
            item.sl = index + 1; // re-index sequentially

            const card = document.createElement('div');
            card.className = 'item-row-card';
            card.innerHTML = `
                <div class="item-row-header">
                    <span class="item-row-title">Item #${item.sl}</span>
                    <button class="btn-remove-item" data-id="${item.id}" title="Remove Item">
                        <i data-lucide="trash-2" style="width:14px;height:14px"></i> Remove
                    </button>
                </div>
                <div class="form-group">
                    <label>Description of Goods</label>
                    <textarea class="form-control item-desc" data-id="${item.id}" rows="2">${item.desc}</textarea>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>HSN Code</label>
                        <input type="text" class="form-control item-hsn" data-id="${item.id}" value="${item.hsn}">
                    </div>
                    <div class="form-group">
                        <label>Qty & Unit</label>
                        <div class="row-group">
                            <input type="number" class="form-control item-qty" data-id="${item.id}" value="${item.qtyNum}" style="width:60px">
                            <input type="text" class="form-control item-unit" data-id="${item.id}" value="${item.unit}">
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>Rate (₹)</label>
                        <input type="number" class="form-control item-rate" data-id="${item.id}" value="${item.rate}" step="0.01">
                    </div>
                </div>
            `;
            el.itemsContainer.appendChild(card);
        });

        lucide.createIcons();

        // Attach event listeners to row inputs
        el.itemsContainer.querySelectorAll('.item-desc').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.desc = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-hsn').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.hsn = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-qty').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.qtyNum = parseFloat(e.target.value) || 0;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-unit').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.unit = e.target.value;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.item-rate').forEach(input => {
            input.addEventListener('input', (e) => {
                const id = Number(e.target.dataset.id);
                const target = state.items.find(i => i.id === id);
                if (target) {
                    target.rate = parseFloat(e.target.value) || 0;
                    updateView();
                }
            });
        });

        el.itemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.dataset.id);
                state.items = state.items.filter(i => i.id !== id);
                renderItemsEditor();
                updateView();
            });
        });
    }

    // Render Printable Remarks List
    function renderRemarks() {
        el.viewRemarksList.innerHTML = '';
        [state.remark1, state.remark2].forEach(rem => {
            if (rem && rem.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = rem;
                el.viewRemarksList.appendChild(li);
            }
        });
    }

    // Update Live Printable Sheet View
    function updateView() {
        // Render Line Items Table Body
        el.viewItemsTableBody.innerHTML = '';
        let subtotal = 0;

        state.items.forEach((item, index) => {
            const amount = item.qtyNum * item.rate;
            subtotal += amount;

            const qtyFormatted = String(item.qtyNum).padStart(2, '0') + (item.unit ? ' ' + item.unit : '');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="col-sl">${index + 1}.</td>
                <td class="col-desc"><div class="item-desc-text">${escapeHtml(item.desc)}</div></td>
                <td class="col-hsn">${escapeHtml(item.hsn)}</td>
                <td class="col-qty">${escapeHtml(qtyFormatted)}</td>
                <td class="col-rate">${formatRupees(item.rate)}</td>
                <td class="col-amount">${formatRupees(amount)}</td>
            `;
            el.viewItemsTableBody.appendChild(tr);
        });

        // Add padding blank rows if items count is small to maintain table height
        const minRows = 3;
        for (let i = state.items.length; i < minRows; i++) {
            const padTr = document.createElement('tr');
            padTr.innerHTML = `
                <td class="col-sl" style="height:40px">&nbsp;</td>
                <td class="col-desc">&nbsp;</td>
                <td class="col-hsn">&nbsp;</td>
                <td class="col-qty">&nbsp;</td>
                <td class="col-rate">&nbsp;</td>
                <td class="col-amount">&nbsp;</td>
            `;
            el.viewItemsTableBody.appendChild(padTr);
        }

        // Subtotal
        el.viewSubtotal.textContent = formatRupees(subtotal);

        // Tax Calculation Logic
        let cgstVal = 0, sgstVal = 0, igstVal = 0, grandTotal = subtotal;

        if (state.taxMode === 'igst18') {
            igstVal = subtotal * 0.18;
            grandTotal = subtotal + igstVal;

            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'table-row';

            el.viewIgst.textContent = formatRupees(igstVal);
        } else if (state.taxMode === 'cgst_sgst9') {
            cgstVal = subtotal * 0.09;
            sgstVal = subtotal * 0.09;
            grandTotal = subtotal + cgstVal + sgstVal;

            el.rowCgst.style.display = 'table-row';
            el.rowSgst.style.display = 'table-row';
            el.rowIgst.style.display = 'none';

            el.viewCgst.textContent = formatRupees(cgstVal);
            el.viewSgst.textContent = formatRupees(sgstVal);
        } else if (state.taxMode === 'custom') {
            const taxPerc = (state.customTaxRate || 0) / 100;
            igstVal = subtotal * taxPerc;
            grandTotal = subtotal + igstVal;

            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'table-row';

            el.rowIgst.cells[0].innerHTML = `<strong>Tax (${state.customTaxRate}%):</strong>`;
            el.viewIgst.textContent = formatRupees(igstVal);
        } else {
            // Exempt
            el.rowCgst.style.display = 'none';
            el.rowSgst.style.display = 'none';
            el.rowIgst.style.display = 'none';
            grandTotal = subtotal;
        }

        // Transportation Charges
        const freightVal = parseFloat(state.transportationFee) || 0;
        grandTotal += freightVal;

        if (el.rowTransportation) {
            if (freightVal > 0 || (state.transportationFee !== '' && state.transportationFee !== 0)) {
                el.rowTransportation.style.display = 'table-row';
                if (el.viewTransportation) el.viewTransportation.textContent = formatRupees(freightVal);
            } else {
                el.rowTransportation.style.display = 'none';
            }
        }

        el.viewGrandTotal.textContent = formatRupees(grandTotal);
        el.viewAmountInWords.textContent = numberToWordsINR(grandTotal);

        renderRemarks();
        updateMobileScale();
    }

    // HTML Escape Helper
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Load Sample Data (matching Quotation.docx sample)
    function loadSampleData() {
        state.invoiceNo = 'QN-23/26-27';
        state.invoiceDate = '26/07/2026';
        state.deliveryNote = '';
        state.modeOfPayment = '';
        state.buyerOrderNo = '';
        state.buyerOrderDate = '';
        state.dispatchDocNo = '';
        state.dispatchDocDate = '';
        state.dispatchThrough = 'Roadways/Logistics';
        state.destination = 'Dhanbad, Jharkhand.';
        state.termsOfDelivery = '';
        
        state.buyerName = 'Samay Homes Pvt. Ltd.';
        state.buyerAddress1 = 'Beside Zudio showroom, Adityapur';
        state.buyerAddress2 = 'Kandra Main Road, Jamshedpur.';
        state.buyerStatePin = 'Jharkhand- 831013';
        
        state.taxMode = 'igst18';
        state.items = [
            {
                id: 1,
                sl: 1,
                desc: '3m Designer Garden Light Pole. J-Shaped Double arm with base plate measuring 200x200x8mm. Bottom pipe dia: 4.5inch and 1m long, Top pipe dia: 3inch and 2m long. Thickness 2.5mm. Black and golden coloured arms and flowers welded in the J section.',
                hsn: '7308',
                qtyNum: 6,
                unit: 'pcs',
                rate: 4800
            },
            {
                id: 2,
                sl: 2,
                desc: 'M16 Foundation Bolts (Set of 4)',
                hsn: '7318',
                qtyNum: 6,
                unit: 'sets',
                rate: 580
            }
        ];

        // Populate Form Controls
        el.invoiceNo.value = state.invoiceNo;
        el.invoiceDate.value = formatDatePickerVal(state.invoiceDate);
        el.deliveryNote.value = state.deliveryNote;
        el.modeOfPayment.value = state.modeOfPayment;
        el.buyerOrderNo.value = state.buyerOrderNo;
        el.buyerOrderDate.value = formatDatePickerVal(state.buyerOrderDate);
        el.dispatchDocNo.value = state.dispatchDocNo;
        el.dispatchDocDate.value = formatDatePickerVal(state.dispatchDocDate);
        el.dispatchThrough.value = state.dispatchThrough;
        el.destination.value = state.destination;
        el.termsOfDelivery.value = state.termsOfDelivery;

        el.buyerName.value = state.buyerName;
        el.buyerAddress1.value = state.buyerAddress1;
        el.buyerAddress2.value = state.buyerAddress2;
        el.buyerStatePin.value = state.buyerStatePin;

        el.taxMode.value = state.taxMode;
        el.customTaxRow.classList.add('hidden');

        el.viewInvoiceNo.textContent = state.invoiceNo;
        el.viewInvoiceDate.textContent = state.invoiceDate;
        el.viewDispatchThrough.textContent = state.dispatchThrough;
        el.viewDestination.textContent = state.destination;
        el.viewBuyerName.textContent = state.buyerName;
        el.viewBuyerAddr1.textContent = state.buyerAddress1;
        el.viewBuyerAddr2.textContent = state.buyerAddress2;
        el.viewBuyerStatePin.textContent = state.buyerStatePin;

        renderItemsEditor();
        updateView();
    }

    // Reset Form
    function resetForm() {
        if (!confirm('Are you sure you want to reset all form fields?')) return;
        state.items = [];
        state.buyerName = '';
        state.buyerAddress1 = '';
        state.buyerAddress2 = '';
        state.buyerStatePin = '';
        
        el.buyerName.value = '';
        el.buyerAddress1.value = '';
        el.buyerAddress2.value = '';
        el.buyerStatePin.value = '';
        el.viewBuyerName.textContent = '';
        el.viewBuyerAddr1.textContent = '';
        el.viewBuyerAddr2.textContent = '';
        el.viewBuyerStatePin.textContent = '';

        renderItemsEditor();
        updateView();
    }

    // Trigger Browser PDF Print / Download
    function triggerPrintPdf() {
        saveToHistory();
        window.print();
    }

    // Export Editable Native DOCX Word File using docx.js library
    function exportDocxFile() {
        saveToHistory();

        if (typeof docx === 'undefined') {
            alert('Docx library is still loading. Please try again in 5 seconds.');
            return;
        }

        const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, BorderStyle, TableLayoutType, VerticalMergeType, HeightRule } = docx;

        const VMerge = VerticalMergeType || { RESTART: 'restart', CONTINUE: 'continue' };
        const HRule = HeightRule || { AT_LEAST: 'atLeast', EXACTLY: 'exact' };

        // Calculate Totals for DOCX
        let subtotal = 0;
        state.items.forEach(i => subtotal += (i.qtyNum * i.rate));

        let igstVal = 0, cgstVal = 0, sgstVal = 0, grandTotal = subtotal;

        if (state.taxMode === 'igst18') {
            igstVal = subtotal * 0.18;
            grandTotal = subtotal + igstVal;
        } else if (state.taxMode === 'cgst_sgst9') {
            cgstVal = subtotal * 0.09;
            sgstVal = subtotal * 0.09;
            grandTotal = subtotal + cgstVal + sgstVal;
        } else if (state.taxMode === 'custom') {
            const taxPerc = (state.customTaxRate || 0) / 100;
            igstVal = subtotal * taxPerc;
            grandTotal = subtotal + igstVal;
        }

        const borderStyleSolid = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
        const cellBorders = {
            top: borderStyleSolid,
            bottom: borderStyleSolid,
            left: borderStyleSolid,
            right: borderStyleSolid
        };

        const TOTAL_WIDTH_DXA = 10800;
        // Exact column grid matching CSS: [Sl.No (7%), Description (48%), HSN (9%), Qty (11%), Rate (12%), Amount (13%)]
        const colWidths = [756, 5184, 972, 1188, 1296, 1404]; // Total = 10800 DXA
        const leftWidth = colWidths[0] + colWidths[1]; // 5940 DXA (55% Left section over Sl.No + Description)
        const rightCol1Width = colWidths[2] + colWidths[3]; // 2160 DXA (above HSN + Qty)
        const rightCol2Width = colWidths[4] + colWidths[5]; // 2700 DXA (above Rate + Amount)
        const rightFullWidth = colWidths[2] + colWidths[3] + colWidths[4] + colWidths[5]; // 4860 DXA (45% Right section)

        const masterTableRows = [];

        // --- ROW 0: Seller Info (Merged vertical restart) | Invoice No | Date ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.RESTART,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: state.sellerName, bold: true, size: 24 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.sellerAddr1, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.sellerAddr2, size: 18 })] }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: `GST NO. ${state.sellerGst}`, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Invoice no.: ", size: 18 }), new TextRun({ text: state.invoiceNo, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Date: ", bold: true, size: 18 }), new TextRun({ text: state.invoiceDate, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 1: Seller Info (Vertical continue) | Delivery Note | Mode of Payment ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Delivery Note: ", bold: true, size: 18 }), new TextRun({ text: state.deliveryNote || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Mode of Payment: ", bold: true, size: 18 }), new TextRun({ text: state.modeOfPayment || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 2: Seller Info (Vertical continue) | Phone no | Email ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Phone no.: ", bold: true, size: 18 }), new TextRun({ text: state.sellerPhone, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "E-mail: ", bold: true, size: 18 }), new TextRun({ text: state.sellerEmail, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 3: Buyer Details (Vertical restart) | Buyer's Order No | Dated ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.RESTART,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Buyer Details:", size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.buyerName, bold: true, size: 20 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.buyerAddress1, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.buyerAddress2, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.buyerStatePin, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Buyer's Order No.: ", bold: true, size: 18 }), new TextRun({ text: state.buyerOrderNo || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dated: ", bold: true, size: 18 }), new TextRun({ text: state.buyerOrderDate || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 4: Buyer Details (Vertical continue) | Dispatch Doc No | Dated ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dispatch Document No.: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchDocNo || "-", size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dated: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchDocDate || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 5: Buyer Details (Vertical continue) | Dispatch through | Destination ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol1Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Dispatch through: ", bold: true, size: 18 }), new TextRun({ text: state.dispatchThrough, bold: true, size: 18 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: { size: rightCol2Width, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Destination: ", bold: true, size: 18 }), new TextRun({ text: state.destination, size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 6: Buyer Details (Vertical continue) | Terms of delivery ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        verticalMerge: VMerge.CONTINUE,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: []
                    }),
                    new TableCell({
                        columnSpan: 4,
                        width: { size: rightFullWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Terms of delivery: ", bold: true, size: 18 }), new TextRun({ text: state.termsOfDelivery || "-", size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // --- ROW 7: Items Header Row ---
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ width: { size: colWidths[0], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sl. No.", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[1], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Description of Goods", bold: true, size: 18 })] })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[2], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "HSN", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[3], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Qty.", bold: true, size: 18 })], alignment: AlignmentType.CENTER })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[4], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Rate", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Amount", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        // --- ROW 8..N: Item Detail Rows (with minimum height so table fills the page) ---
        const itemMinHeight = state.items.length <= 2 ? 3200 : 1800;

        state.items.forEach((item, idx) => {
            const amt = item.qtyNum * item.rate;
            masterTableRows.push(
                new TableRow({
                    height: { value: itemMinHeight, rule: HRule.AT_LEAST },
                    children: [
                        new TableCell({ width: { size: colWidths[0], type: WidthType.DXA }, children: [new Paragraph({ text: `${idx + 1}.`, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[1], type: WidthType.DXA }, children: [new Paragraph({ text: item.desc, size: 18 })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[2], type: WidthType.DXA }, children: [new Paragraph({ text: item.hsn, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[3], type: WidthType.DXA }, children: [new Paragraph({ text: `${item.qtyNum} ${item.unit}`, size: 18, alignment: AlignmentType.CENTER })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[4], type: WidthType.DXA }, children: [new Paragraph({ text: `₹${item.rate.toFixed(2)}`, size: 18, alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ text: `₹${amt.toFixed(2)}`, size: 18, alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        });

        const span5Width = colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4]; // 8400 DXA

        // Total Row
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Total:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${subtotal.toFixed(2)}`, bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        if (state.taxMode === 'igst18') {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "IGST 18%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${igstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        } else if (state.taxMode === 'cgst_sgst9') {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "CGST 9%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${cgstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                }),
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "SGST 9%:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${sgstVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        }

        // Transportation Charges Row
        const freightVal = parseFloat(state.transportationFee) || 0;
        grandTotal += freightVal;

        if (freightVal > 0 || (state.transportationFee !== '' && state.transportationFee !== 0)) {
            masterTableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Transportation Charges:", bold: true, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                        new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${freightVal.toFixed(2)}`, size: 18 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                    ]
                })
            );
        }

        // Grand Total Row
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({ columnSpan: 5, width: { size: span5Width, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Grand Total:", bold: true, size: 20 })], alignment: AlignmentType.RIGHT })], borders: cellBorders }),
                    new TableCell({ width: { size: colWidths[5], type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: `₹${grandTotal.toFixed(2)}`, bold: true, size: 20 })], alignment: AlignmentType.RIGHT })], borders: cellBorders })
                ]
            })
        );

        // Amount in Words Row (Spans all 6 cols)
        masterTableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Amount In words: ", bold: true, size: 18 }), new TextRun({ text: numberToWordsINR(grandTotal), size: 18 })] })
                        ]
                    })
                ]
            })
        );

        // Footer Row (Remarks Left / Bank Details Right) - Spans 3 cols each
        masterTableRows.push(
            new TableRow({
                height: { value: 1600, rule: HRule.AT_LEAST },
                children: [
                    new TableCell({
                        columnSpan: 2,
                        width: { size: leftWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Remarks:", bold: true, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: `• ${state.remark1}`, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `• ${state.remark2}`, size: 17 })] })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        width: { size: rightFullWidth, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Company Bank Details", bold: true, size: 18 })] }),
                            new Paragraph({ children: [new TextRun({ text: `Bank name: `, size: 17 }), new TextRun({ text: state.bankName, bold: true, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `A/C No.: `, size: 17 }), new TextRun({ text: state.bankAccount, bold: true, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: `Branch & IFSC Code: `, size: 17 }), new TextRun({ text: state.bankBranchIfsc, size: 17 })] }),
                            new Paragraph({ children: [new TextRun({ text: state.bankIfscCode, bold: true, size: 17 })] })
                        ]
                    })
                ]
            })
        );

        // Signature Section Row (Inside Master Table matching original Quotation.docx)
        masterTableRows.push(
            new TableRow({
                height: { value: 1800, rule: HRule.AT_LEAST },
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
                        borders: cellBorders,
                        children: [
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: "For Sah Enterprise", bold: true, size: 18 })], alignment: AlignmentType.RIGHT }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ text: "" }),
                            new Paragraph({ children: [new TextRun({ text: "Authorized Signatory", italic: true, size: 18 })], alignment: AlignmentType.RIGHT }),
                            new Paragraph({ children: [new TextRun({ text: "E. & O.E", italic: true, size: 16 })], alignment: AlignmentType.RIGHT })
                        ]
                    })
                ]
            })
        );

        const singleMasterTable = new Table({
            width: { size: TOTAL_WIDTH_DXA, type: WidthType.DXA },
            layout: TableLayoutType.FIXED,
            columnWidths: colWidths,
            rows: masterTableRows
        });

        const doc = new Document({
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 720,
                                bottom: 720,
                                left: 720,
                                right: 720
                            }
                        }
                    },
                    children: [
                        new Paragraph({
                            children: [new TextRun({ text: "QUOTATION", bold: true, underline: {}, size: 28 })],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({ text: "" }),
                        singleMasterTable
                    ]
                }
            ]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `Quotation_${state.invoiceNo.replace(/[/\\?%*:|"<>]/g, '-')}.docx`);
        }).catch(err => {
            console.error('Docx Export Error:', err);
            alert('Failed to generate Word document.');
        });
    }

    // Local Storage History Management
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem('sah_quotations') || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveToHistory() {
        const history = getHistory();
        const existingIndex = history.findIndex(h => h.invoiceNo === state.invoiceNo);
        const snapshot = {
            id: Date.now(),
            invoiceNo: state.invoiceNo,
            date: state.invoiceDate,
            buyerName: state.buyerName,
            timestamp: new Date().toLocaleString(),
            state: JSON.parse(JSON.stringify(state))
        };

        if (existingIndex >= 0) {
            history[existingIndex] = snapshot;
        } else {
            history.unshift(snapshot);
        }

        localStorage.setItem('sah_quotations', JSON.stringify(history));
        updateHistoryCount();
    }

    function updateHistoryCount() {
        const history = getHistory();
        el.historyCount.textContent = history.length;
    }

    function openHistoryModal() {
        renderHistoryList();
        el.historyModal.classList.remove('hidden');
    }

    function closeHistoryModal() {
        el.historyModal.classList.add('hidden');
    }

    function renderHistoryList() {
        const history = getHistory();
        if (history.length === 0) {
            el.historyList.innerHTML = '<p class="text-muted">No saved quotations found.</p>';
            return;
        }

        el.historyList.innerHTML = '';
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-info">
                    <h4>${escapeHtml(item.invoiceNo)} - ${escapeHtml(item.buyerName || 'Unnamed Buyer')}</h4>
                    <p>Saved on: ${item.timestamp}</p>
                </div>
                <button class="btn btn-outline btn-load-history" data-id="${item.id}">Load</button>
            `;
            el.historyList.appendChild(div);
        });

        el.historyList.querySelectorAll('.btn-load-history').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.dataset.id);
                const target = history.find(h => h.id === id);
                if (target && target.state) {
                    Object.assign(state, target.state);
                    
                    // Update input fields
                    el.invoiceNo.value = state.invoiceNo;
                    el.invoiceDate.value = state.invoiceDate;
                    el.buyerName.value = state.buyerName;
                    el.buyerAddress1.value = state.buyerAddress1;
                    el.buyerAddress2.value = state.buyerAddress2;
                    el.buyerStatePin.value = state.buyerStatePin;
                    el.taxMode.value = state.taxMode;

                    renderItemsEditor();
                    updateView();
                    closeHistoryModal();
                }
            });
        });
    }

    function clearHistory() {
        if (!confirm('Clear all saved history?')) return;
        localStorage.removeItem('sah_quotations');
        updateHistoryCount();
        renderHistoryList();
    }

    // Run Initialization when DOM is Ready
    document.addEventListener('DOMContentLoaded', init);

})();
