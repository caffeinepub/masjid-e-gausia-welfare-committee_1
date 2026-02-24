import List "mo:core/List";
import Char "mo:core/Char";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

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
  public shared ({ caller }) func addAnnouncement(title : Text, body : Text) : async () {
    if (title.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Title cannot be empty") };
    if (body.trim(#predicate(Char.isWhitespace)).size() == 0) { Runtime.trap("Body cannot be empty") };

    let announcement : Announcement = {
      title;
      body;
      date = Time.now();
    };

    announcementList.add(announcement);
  };

  public query ({ caller }) func getAnnouncements() : async [Announcement] {
    announcementList.toArray();
  };

  // Contact Inquiries CRUD Operations
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
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

  public query ({ caller }) func getContactInquiries() : async [ContactInquiry] {
    contactInquiryList.toArray();
  };
};
