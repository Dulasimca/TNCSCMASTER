export class TableConstants {
    //Master Document
    DepositorMasterType: any;
    TypeMaster: any;
    TransactionMaster: any;
    RegionMasterCols: any;
    CerealNonCerealItemMaster: any;
    CommodityMasterCols: any;
    VehicleMaster: any;
    WeighmentMaster: any;
    RailYardMaster: any;
    SchemeMaster: any;
    SchemeCommodityMaster: any;

    constructor() {
        this.RegionMasterCols = [
            { header: 'S.No.', field: 'SlNo' },
            { header: 'Region Code', field: 'RegionCode' },
            { header: 'Region Name', field: 'RegionName' }
        ];

        this.DepositorMasterType = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Depositor Code', field: 'DepositorCode' },
            { header: 'Depositor Name', field: 'DepositorName' },
            { header: 'Depositor Type', field: 'DepositorType' },
            { header: 'Active Flag', field: 'ActiveFlag' }
        ];

        this.TypeMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Type Code', field: 'Tycode' },
            { header: 'Type Name', field: 'Tyname' },
            { header: 'Type Transaction', field: 'TYTransaction' },
            { header: 'Type Transaction', field: 'TypeTran' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.TransactionMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Transaction Code', field: 'TRCode' },
            { header: 'Transaction Name', field: 'TRName' },
            { header: 'Transaction Type', field: 'TransactionTY' },
            { header: 'Transaction Type', field: 'TransType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.CerealNonCerealItemMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Item Code', field: 'ITCode' },
            { header: 'Item Name', field: 'ITDescription' },
            { header: 'Item Type', field: 'ItemName' }
        ];

        this.CommodityMasterCols = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Item Code', field: 'ITCode' },
            { header: 'Item Name', field: 'ITDescription' },
            { header: 'Item Weighment', field: 'ITBweighment' },
            { header: 'IT Tax', field: 'ittax' },
            { header: 'GR Name', field: 'GRName' },
            { header: 'Item Type', field: 'ItemType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' },
            { header: 'Allotment Group', field: 'Allotmentgroup' },
            { header: 'S Flag', field: 'SFlag' },
            { header: 'CB Flag', field: 'CBFlag' },
            { header: 'Unit', field: 'Unit' }
        ];

        this.VehicleMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Vehicle Code', field: 'VHCode' },
            { header: 'Vehicle Type', field: 'VHType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.WeighmentMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Weighment Code', field: 'WECode' },
            { header: 'Weighment Type', field: 'WEType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.RailYardMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Railway Yard Code', field: 'RYCode' },
            { header: 'Railway Yard Type', field: 'RYName' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];

        this.SchemeMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            { header: 'Scheme Code', field: 'SCCode' },
            { header: 'Scheme Name', field: 'Name' },
            { header: 'Scheme Type', field: 'SCType' },
            { header: 'Active Flag', field: 'Activeflag' },
            { header: 'Delete Flag', field: 'DeleteFlag' },
            { header: 'Annavitran TNCSCID', field: 'AnnavitranTNCSCID' },
            { header: 'Allotment Scheme', field: 'AllotmentScheme' }
        ];

        this.SchemeCommodityMaster = [
            { header: 'S.No', field: 'SlNo', width: '40px' },
            // { header: 'RowID', field: 'RowId' },
            { header: 'Scheme Code', field: 'SchemeCode' },
            { header: 'Scheme Name', field: 'SchemeName' },
            { header: 'Commodity Name', field: 'CommodityName' },
            { header: 'Active Flag', field: 'ActiveFlag' },
            { header: 'Delete Flag', field: 'DeleteFlag' }
        ];
    }
}