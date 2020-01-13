export class PathConstants {

  ///Common
  public static readonly REGION_DATA = '/api/Region';
  public static readonly GODOWN_DATA = '/api/GodownMaster';

  ///MASTER DOCUMENT
  public static readonly DEPOSITOR_TYPE_MASTER = '/api/TypeMaster/Get';
  public static readonly DEPOSITOR_MASTER_TYPE_GET = '/api/ManageDepositorsMaster/Get';
  public static readonly DEPODITOR_MASTER_TYPE_POST = '/api/ManageDepositorsMaster/Post';
  public static readonly TYPE_MASTER_POST = '/api/ManageTypeMaster/Post';
  public static readonly TRANSACTION_MASTER = '/api/TransactionMaster';
  public static readonly TRANSACTION_MASTER_POST = '/api/ManageTransactionMaster/Post';
  public static readonly ITEM_MASTER = '/api/ItemMaster';
  public static readonly CEREAL_MASTER_POST = '/api/ManageItemMaster/Post';
  public static readonly ALLOTMENT_GROUP_MASTER = '/api/AllotmentGroupMaster';
  public static readonly COMMODITY_MASTER_POST = '/api/ManageItemMaster/Post';
  public static readonly VEHICLE_MASTER = '/api/VehicleMaster';
  public static readonly VEHICLE_MASTER_POST = '/api/ManageVehicleMaster/Post';
  public static readonly WEIGHMENT_MASTER = '/api/ManageWeighmentMaster';
  public static readonly WEIGHMENT_MASTER_POST = '/api/ManageWeighmentMaster/Post';
  public static readonly RAILWAY_YARD_MASTER = '/api/ManageRailwayYardMaster';
  public static readonly RAILWAY_YARD_MASTER_POST = '/api/ManageRailwayYardMaster/Post';
  public static readonly SCHEME_MASTER = '/api/Scheme';
  public static readonly SCHEME_MASTER_POST = '/api/ManageSchemesMaster/Post';
  public static readonly SCHEME_COMMODITY_MASTER = '/api/SchemeCommodity';
  public static readonly SCHEME_COMMODITY_GET = '/api/ManageSchemeCommodity/Get';
  public static readonly SCHEME_COMMODITY_POST = '/api/ManageSchemeCommodity/Post';
  public static readonly PACKING_AND_WEIGHMENT = '/api/PackingandWeighment';
  public static readonly PACKING_MASTER_POST = '/api/ManagePackingMaster/Post';



  ///Masters
  public static readonly REGION_POST = '/api/ManageRegionMaster/Post';
  public static readonly REGION_GET = '/api/ManageRegionMaster/Get';

  ///Menu&Login
  public static readonly MENU = '/api/Menu/Get';
  public static readonly LOGIN = '/api/Users/Get';
  public static readonly CHANGE_PASSWORD_POST = '/api/Users/Post';
  public static readonly GODOWN_PROFILE_POST = '/api/GodownProfiles/Post';
  public static readonly GODOWN_PROFILE_GET = '/api/GodownProfiles/Get';

  ///Settings
  public static readonly SETTINGS_GET = '/api/Settings';

  ///TrackIP
  public static readonly IMAGE_UPLOAD = '/api/Upload';


}
