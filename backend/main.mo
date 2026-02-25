import List "mo:core/List";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

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

  let announcementList = List.empty<Announcement>();
  let contactInquiryList = List.empty<ContactInquiry>();

  // Announcements CRUD Operations
  // Admin-only: only admins should be able to post announcements
  public shared ({ caller }) func addAnnouncement(title : Text, body : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add announcements");
    };
    if (title.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Title cannot be empty") };
    if (body.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Body cannot be empty") };

    let announcement : Announcement = {
      title;
      body;
      date = Time.now();
    };

    announcementList.add(announcement);
  };

  // Public: anyone can view announcements
  public query func getAnnouncements() : async [Announcement] {
    announcementList.toArray();
  };

  // Contact Inquiries CRUD Operations
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
