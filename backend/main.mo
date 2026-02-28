import List "mo:core/List";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


// Specify the migration function in the with clause

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Announcement = {
    id : Nat;
    title : Text;
    body : Text;
    date : Time.Time;
  };

  type ContactInquiry = {
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  type JumaCollection = {
    id : Nat;
    amount : Nat;
    description : Text;
    date : Int;
    addedBy : Principal;
  };

  let announcementList = List.empty<Announcement>();
  let contactInquiryList = List.empty<ContactInquiry>();
  let jumaCollectionsList = List.empty<JumaCollection>();

  var nextAnnouncementId : Nat = 0;
  var nextJumaCollectionId : Nat = 0;

  // Announcements CRUD Operations
  // Admin-only: only admins should be able to post announcements
  public shared ({ caller }) func addAnnouncement(title : Text, body : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add announcements");
    };
    if (title.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Title cannot be empty") };
    if (body.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Body cannot be empty") };

    let announcement : Announcement = {
      id = nextAnnouncementId;
      title;
      body;
      date = Time.now();
    };

    nextAnnouncementId += 1;
    announcementList.add(announcement);
  };

  // Admin-only: only admins should be able to delete announcements
  public shared ({ caller }) func deleteAnnouncement(announcementId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    let sizeBefore = announcementList.size();
    let filtered = announcementList.filter(
      func(a) {
        a.id != announcementId;
      }
    );
    if (filtered.size() == sizeBefore) {
      Runtime.trap("Announcement not found");
    };
    announcementList.clear();
    announcementList.addAll(filtered.values());
  };

  // Public: anyone can view announcements
  public query func getAnnouncements() : async [Announcement] {
    announcementList.toArray();
  };

  // Juma Collection Operations
  // Admin-only: only admins can add Juma collection entries
  public shared ({ caller }) func addJumaCollection(amount : Nat, description : Text, date : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add Juma collections");
    };
    if (description.trim(#predicate(Char.isWhitespace)).size() == 0) {
      Runtime.trap("Description cannot be empty");
    };
    if (amount == 0) { Runtime.trap("Amount must be greater than 0") };

    let collection : JumaCollection = {
      id = nextJumaCollectionId;
      amount;
      description;
      date;
      addedBy = caller;
    };

    nextJumaCollectionId += 1;
    jumaCollectionsList.add(collection);
  };

  // Public: anyone can view Juma collections
  public query func getJumaCollections() : async [JumaCollection] {
    jumaCollectionsList.toArray();
  };

  // Admin-only: only admins can delete Juma collection entries
  public shared ({ caller }) func deleteJumaCollection(collectionId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Juma collections");
    };
    let sizeBefore = jumaCollectionsList.size();
    let filtered = jumaCollectionsList.filter(
      func(c) {
        c.id != collectionId;
      }
    );
    if (filtered.size() == sizeBefore) {
      Runtime.trap("Juma collection entry not found");
    };
    jumaCollectionsList.clear();
    jumaCollectionsList.addAll(filtered.values());
  };

  // Contact Inquiries Operations
  // Public: anyone can submit a contact inquiry
  public shared func submitInquiry(name : Text, email : Text, message : Text) : async () {
    if (name.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Name cannot be empty") };
    if (email.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Email cannot be empty") };
    if (message.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Message cannot be empty") };

    let inquiry : ContactInquiry = {
      name;
      email;
      message;
      submittedAt = Time.now();
    };

    contactInquiryList.add(inquiry);
  };

  // Admin-only: contact inquiries contain private user data
  public query ({ caller }) func getContactInquiries() : async [ContactInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    contactInquiryList.toArray();
  };
};
